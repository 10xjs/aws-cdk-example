import type { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const TABLE_NAME = process.env.TABLE_NAME ?? '';
const PRIMARY_KEY = process.env.PRIMARY_KEY ?? '';

const db = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const response = await db
      .get({
        TableName: TABLE_NAME,
        Key: {
          [PRIMARY_KEY]: event.pathParameters!.id,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(response.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
