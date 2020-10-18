import type { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';

const TABLE_NAME = process.env.TABLE_NAME ?? '';
const PRIMARY_KEY = process.env.PRIMARY_KEY ?? '';

const db = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const item = JSON.parse(event.body!);

    await db
      .put({
        TableName: TABLE_NAME,
        Item: {
          ...item,
          [PRIMARY_KEY]: uuid.v4(),
        },
      })
      .promise();

    return {
      statusCode: 201,
      body: '',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
