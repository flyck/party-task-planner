import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { join } from "path";

export function createParticipantResolvers(stack: cdk.Stack, api: appsync.GraphqlApi, parties: appsync.DynamoDbDataSource, participants: appsync.DynamoDbDataSource) {
  // Make sure we only allow the creation of participants for existing parties
  const CreateParticipantF1 = new appsync.AppsyncFunction(stack, "createParticipantF1", {
    api,
    name: "CreateParticipantGet",
    dataSource: parties,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getParticipantParty.js")),
  });

  const CreateParticipantF2 = new appsync.AppsyncFunction(stack, "createParticipantF2", {
    api,
    name: "CreateParticipantPut",
    dataSource: participants,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/createParticipant.js"))
  });
  new appsync.Resolver(stack, "CreateParticipantPipeline", {
    api,
    typeName: 'Mutation',
    fieldName: 'createParticipant',
    pipelineConfig: [CreateParticipantF1, CreateParticipantF2],
    requestMappingTemplate: appsync.MappingTemplate.fromString('{}'),
    responseMappingTemplate: appsync.MappingTemplate.fromString('$util.toJson($ctx.result)'),
  });

  participants.createResolver("getParticipant", {
    typeName: "Query",
    fieldName: "getParticipant",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getParticipant.js"))
  });

  participants.createResolver("getParticipants", {
    typeName: "Query",
    fieldName: "getParticipants",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getParticipants.js"))
  });

  participants.createResolver("getPartyParticipants", {
    typeName: "Party",
    fieldName: "participants",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getPartyParticipants.js"))
  });

  // Make the update respect existing data. First resolver is a javascript resolver as well since
  // javascript resolvers and templates cannot be mixed within the same pipeline
  // TODO switch to updateItem https://dev.to/aws/20-days-of-dynamodb-day-4-conditional-updateitem-dac
  const UpdateParticipantF1 = new appsync.AppsyncFunction(stack, "updateParticipantF1", {
    api,
    name: "UpdateParticipantGet",
    dataSource: participants,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getParticipant.js")),
  });
  // cannot seem to run two operations in the same unit resolver even with javascript
  const UpdateParticipantF2 = new appsync.AppsyncFunction(stack, "updateParticipantF2", {
    api,
    name: "UpdateParticipantPut",
    dataSource: participants,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/updateParticipant.js"))
  });
  new appsync.Resolver(stack, "UpdateParticipantPipeline", {
    api,
    typeName: 'Mutation',
    fieldName: 'updateParticipant',
    pipelineConfig: [UpdateParticipantF1, UpdateParticipantF2],
    requestMappingTemplate: appsync.MappingTemplate.fromString('{}'),
    responseMappingTemplate: appsync.MappingTemplate.fromString('$util.toJson($ctx.result)'),
  });

  participants.createResolver("deleteParticipant", {
    typeName: "Mutation",
    fieldName: "deleteParticipant",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/deleteParticipant.js"))
  });
}
