import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

/**
 * Sends a request to create an item
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBPutItemRequest} the request
 */

export function request(ctx) {
  const id = util.autoId().slice(0, 8)
  return ddb.put({ key: { id }, item: ctx.args.args });
}

/**
 * Returns the fetched DynamoDB item
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the DynamoDB item
 */
export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  return ctx.result;
}
