import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { getTodosForUser } from '../../businessLogic/todos'
import { getUserId, parseNextKeyParameter, parseLimitParameter } from '../utils';
import { GetTodosResponse } from '../../models/GetTodosResponse'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId: string = getUserId(event);
    let nextKey; // Next key to continue scan operation if necessary
    let limit; // Maximum number of elements to return
    try {
      // Parse query parameters
      nextKey = parseNextKeyParameter(event);
      limit = parseLimitParameter(event) || 10;
    } catch (e) {
      console.log('Failed to parse query parameters: ', e.message)
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'Invalid parameters'
        })
      }
    }

    const response: GetTodosResponse = await getTodosForUser(userId, nextKey, limit);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items: response.items,
        nextKey: response.nextKey
      }),
    };
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
