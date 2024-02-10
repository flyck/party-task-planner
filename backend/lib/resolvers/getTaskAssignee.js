import { util, runtime } from '@aws-appsync/utils';

/**
 * Queries a DynamoDB table, limits the number of returned items, and paginates with the provided `nextToken`
 * @param {import('@aws-appsync/utils').Context<{source: {partyId: string,assigneeId?: string}}>} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBGetItemRequest} the request
 */
export function request(ctx) {
  const { partyId } = ctx.source

  if (!ctx.source?.assigneeId) {
    runtime.earlyReturn()
  }

  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({ partyId, id: ctx.source.assigneeId }),
  };
}

/**
 * Returns the query items
 * @param {import('@aws-appsync/utils').Context} ctx the context
 */
export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  return ctx.result;
}
