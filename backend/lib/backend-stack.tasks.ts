import { Stack } from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { DynamoDbDataSource, GraphqlApi } from 'aws-cdk-lib/aws-appsync';
import { join } from "path";

interface props {
  stack: Stack
  api: GraphqlApi
  parties: DynamoDbDataSource,
  participants: DynamoDbDataSource,
  tasks: DynamoDbDataSource
}

export function createTaskResolvers({ api, participants, parties, stack, tasks }: props) {
  // Make sure we only allow the creation of tasks for existing parties
  // NICETOHAVE check existance of participant before creation or update if specified
  const CreateTaskF1 = new appsync.AppsyncFunction(stack, "createTaskF1", {
    api,
    name: "CreateTaskGet",
    dataSource: parties,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getRelatedParty.js")),
  });

  const CreateTaskF2 = new appsync.AppsyncFunction(stack, "createTaskF2", {
    api,
    name: "CreateTaskPut",
    dataSource: tasks,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/createTask.js"))
  });
  new appsync.Resolver(stack, "CreateTaskPipeline", {
    api,
    typeName: 'Mutation',
    fieldName: 'createTask',
    pipelineConfig: [CreateTaskF1, CreateTaskF2],
    requestMappingTemplate: appsync.MappingTemplate.fromString('{}'),
    responseMappingTemplate: appsync.MappingTemplate.fromString('$util.toJson($ctx.result)'),
  });

  // Make the update respect existing data. First resolver is a javascript resolver as well since
  // javascript resolvers and templates cannot be mixed within the same pipeline
  // TODO switch to updateItem https://dev.to/aws/20-days-of-dynamodb-day-4-conditional-updateitem-dac
  const UpdateTaskF1 = new appsync.AppsyncFunction(stack, "updateTaskF1", {
    api,
    name: "UpdateTaskGet",
    dataSource: tasks,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getTask.js")),
  });

  const UpdateTaskF2 = new appsync.AppsyncFunction(stack, "updateTaskF2", {
    api,
    name: "UpdateTaskPut",
    dataSource: tasks,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/updateParticipant.js"))
  });

  new appsync.Resolver(stack, "UpdateTaskPipeline", {
    api,
    typeName: 'Mutation',
    fieldName: 'updateTask',
    pipelineConfig: [UpdateTaskF1, UpdateTaskF2],
    requestMappingTemplate: appsync.MappingTemplate.fromString('{}'),
    responseMappingTemplate: appsync.MappingTemplate.fromString('$util.toJson($ctx.result)'),
  });

  tasks.createResolver("getTask", {
    typeName: "Query",
    fieldName: "getTask",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getTask.js"))
  });

  tasks.createResolver("getTasks", {
    typeName: "Query",
    fieldName: "getTasks",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getTasks.js"))
  });

  // TODO fix
  tasks.createResolver("getPartyTasks", {
    typeName: "Party",
    fieldName: "tasks",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getPartyParticipants.js"))
  });

  participants.createResolver("getTaskParticipants", {
    typeName: "Task",
    fieldName: "assignee",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getTaskAssignee.js"))
  });

  tasks.createResolver("deleteTask", {
    typeName: "Mutation",
    fieldName: "deleteTask",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/deleteTask.js"))
  });
}
