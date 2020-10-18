import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';

// import { LocalBundler } from '@aws-cdk/aws-lambda-nodejs/lib/bundlers.js';
// LocalBundler.runsLocally = () => true;

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

    const createHandler = (
      name: string,
      resource: apigateway.Resource,
      method: string
    ) => {
      // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html
      const handler = new lambda.Function(this, name, {
        code: new lambda.AssetCode('../../functions/rest-api/cdk.out'),
        handler: `{name}.handler`,
        runtime: lambda.Runtime.NODEJS_12_X,
        environment: {
          TABLE_NAME: table.tableName,
          PRIMARY_KEY: PRIMARY_KEY,
        },
      });

      table.grantReadWriteData(handler);

      resource.addMethod(method, new apigateway.LambdaIntegration(handler));
    };

    const api = new apigateway.RestApi(this, 'itemsApi', {
      restApiName: 'Items Service',
    });

    const items = api.root.addResource('items');
    const item = items.addResource('{id}');

    createHandler('get-one', item, 'GET');
    createHandler('create-one', items, 'POST');
    createHandler('delete-one', item, 'DELETE');
    createHandler('update-one', item, 'PATCH');

    createHandler('get-all', items, 'GET');
  }
}
