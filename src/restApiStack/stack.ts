import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class RestApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'items', {
      partitionKey: {
        name: 'itemId',
        type: dynamodb.AttributeType.STRING,
      },
      tableName: 'items',

      // The default removal policy is RETAIN, which means that cdk destroy will
      // not attempt to delete the new table, and it will remain in your account
      // until manually deleted. By setting the policy to DESTROY, cdk destroy
      // will delete the table (even if it has data in it)
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html
    const createContact = new lambda.NodejsFunction(this, 'createContact', {
      entry: './handler/createContact.ts',
      handler: 'createContact',
    });
  }
}
