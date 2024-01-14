import { util } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

/**
 * Sends a request to get an item with id `ctx.args.id`
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBPutItemRequest} the request
 */
export function request(ctx) {
  if (!ctx.prev.result) {
    util.error("Cannot update non-exsiting item!")
  }

  // merge existing values with individual fields from update
  const properties = {
    ...ctx.prev.result,
    ...ctx.args.args,
  }

  return ddb.put({ key: { id: ctx.args.args.id }, item: properties });
}

export const response = (ctx) => ctx.result;
