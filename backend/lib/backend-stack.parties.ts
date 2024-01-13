import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { join } from "path";

export function createPartyResolvers(stack: cdk.Stack, api: appsync.GraphqlApi, dataSource: appsync.DynamoDbDataSource) {
  dataSource.createResolver("createParty", {
    typeName: "Mutation",
    fieldName: "createParty",
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/createParty.js"))
  });

  dataSource.createResolver("getParty", {
    typeName: 'Query',
    fieldName: 'getParty',
    requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem("id", "id"),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
  });

  // Make the update respect existing data. First resolver is a javascript resolver as well since
  // javascript resolvers and templates cannot be mixed within the same pipeline
  // TODO switch to updateItem https://dev.to/aws/20-days-of-dynamodb-day-4-conditional-updateitem-dac
  const UpdatePartyF1 = new appsync.AppsyncFunction(stack, "updatePartyF1", {
    api,
    name: "UpdatePartyGet",
    dataSource: dataSource,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getParty.js")),
  });
  // cannot seem to run two operations in the same unit resolver even with javascript
  const UpdatePartyF2 = new appsync.AppsyncFunction(stack, "updatePartyF2", {
    api,
    name: "UpdatePartyPut",
    dataSource: dataSource,
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    code: appsync.Code.fromAsset(join(__dirname, "./resolvers/updateParty.js"))
  });
  new appsync.Resolver(stack, "UpdatePipeline", {
    api,
    typeName: 'Mutation',
    fieldName: 'updateParty',
    pipelineConfig: [UpdatePartyF1, UpdatePartyF2],
    requestMappingTemplate: appsync.MappingTemplate.fromString('{}'),
    responseMappingTemplate: appsync.MappingTemplate.fromString('$util.toJson($ctx.result)'),
  });

  dataSource.createResolver("deleteParty", {
    typeName: 'Mutation',
    fieldName: 'deleteParty',
    requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem("id", "id"),
    responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
  });
}
