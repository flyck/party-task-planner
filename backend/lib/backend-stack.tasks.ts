import * as cdk from 'aws-cdk-lib';
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
  return
}
