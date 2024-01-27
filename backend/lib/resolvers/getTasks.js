import { util } from '@aws-appsync/utils';

/**
 * Queries a DynamoDB table, limits the number of returned items, and paginates with the provided `nextToken`
 * @param {import('@aws-appsync/utils').Context<{partyId: string; limit?: number; nextToken?:string}>} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBQueryRequest} the request
 */
export function request(ctx) {
  const { partyId, limit = 20, nextToken } = ctx.args;

  const query = JSON.parse(
    util.transform.toDynamoDBConditionExpression({
      partyId: { eq: partyId },
    }),
  );

  return { operation: 'Query', query, limit, nextToken };
}

/**
 * Returns the query items
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {[*]} a flat list of result items
 */
export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }

  return ctx.result;
}
