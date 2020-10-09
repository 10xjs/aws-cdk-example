import {APIGatewayProxyHandler, Context} from 'aws-lambda';

export const hello: APIGatewayProxyHandler = async (event, context) => {
  console.log('received', event);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        mesage: 'Success',
      },
      null,
      2,
    ),
  };
};
