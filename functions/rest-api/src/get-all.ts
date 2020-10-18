import type { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const TABLE_NAME = process.env.TABLE_NAME ?? '';
const PRIMARY_KEY = process.env.PRIMARY_KEY ?? '';

const db = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const response = await db
      .scan({
        TableName: TABLE_NAME,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(response.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
