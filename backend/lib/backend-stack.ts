import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { join } from "path";
import { createPartyResolvers } from './backend-stack.parties';
import { createParticipantResolvers } from './backend-stack.participants';
import { createTaskResolvers } from './backend-stack.tasks';

interface MultiStackProps extends StackProps {
  projectName: string
}

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MultiStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const projectName = props.projectName

    const partyTable = new dynamodb.Table(this, 'parties', {
      tableName: `${projectName}-parties`,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
    });

    partyTable.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

    const participantTable = new dynamodb.Table(this, 'participants', {
      tableName: `${projectName}-participants`,
      // composite key so we can get all participants without a GSI or a scan
      partitionKey: {
        name: 'partyId',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
    });

    participantTable.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

    const taskTable = new dynamodb.Table(this, 'tasks', {
      tableName: `${projectName}-tasks`,
      // composite key so we can get all tasks without a GSI or a scan
      partitionKey: {
        name: 'partyId',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
    });

    taskTable.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

    // AppSync API
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: projectName,
      schema: appsync.SchemaFile.fromAsset(
        join(__dirname, '../../schema.graphql')
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });


    const partyDataSource = api.addDynamoDbDataSource('partyDataSource', partyTable);
    const participantDataSource = api.addDynamoDbDataSource('participantDataSource', participantTable);
    const taskDataSource = api.addDynamoDbDataSource('taskDataSource', taskTable);

    const noneDataSource = api.addNoneDataSource('None');

    createPartyResolvers(this, api, partyDataSource);
    createParticipantResolvers(this, api, partyDataSource, participantDataSource);
    createTaskResolvers({ stack: this, api, parties: partyDataSource, participants: participantDataSource, tasks: taskDataSource });
  }
}
