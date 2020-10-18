import type { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const TABLE_NAME = process.env.TABLE_NAME ?? '';
const PRIMARY_KEY = process.env.PRIMARY_KEY ?? '';

const db = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body!);

    const updates: string[] = [];
    const values: Record<string, any> = {};

    Object.entries(body).forEach(([key, value]) => {
      updates.push(`${key} = :${key}`);
      values[`:${key}`] = value;
    });

    await db
      .update({
        TableName: TABLE_NAME,
        Key: {
          [PRIMARY_KEY]: event.pathParameters!.id,
        },
        UpdateExpression: `set ${updates.join(', ')}`,
        ExpressionAttributeValues: values,
        ReturnValues: 'UPDATED_NEW',
      })
      .promise();

    return {
      statusCode: 204,
      body: '',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
