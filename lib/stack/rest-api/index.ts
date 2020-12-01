import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { WebpackFunction } from '../../util/webpack-function';

const PRIMARY_KEY = 'id';

export class RestApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'items', {
      partitionKey: {
        name: PRIMARY_KEY,
        type: dynamodb.AttributeType.STRING,
      },
      tableName: 'items',
    });

    const api = new apigateway.RestApi(this, 'items-api', {
      restApiName: 'Items Service',
      deployOptions: {
        metricsEnabled: true,
        dataTraceEnabled: true,
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        tracingEnabled: true,
        stageName: 'dev',
      },
    });

    const items = api.root.addResource('items');
    const item = items.addResource('{id}');

    const createHandler = (
      name: string,
      resource: apigateway.Resource,
      method: string
    ) => {
      const handler = new WebpackFunction(this, name, {
        entry: require.resolve(`../../../src/rest-api/${name}.ts`),
      });
      table.grantReadWriteData(handler);

      resource.addMethod(method, new apigateway.LambdaIntegration(handler));
    };

    createHandler('get-one', item, 'GET');
    createHandler('create-one', items, 'POST');
    createHandler('delete-one', item, 'DELETE');
    createHandler('update-one', item, 'PATCH');

    createHandler('get-all', items, 'GET');
  }
}
