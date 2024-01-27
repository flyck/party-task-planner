import { util } from '@aws-appsync/utils';

/**
 * Sends a request to get an item with id `ctx.args.id`
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {import('@aws-appsync/utils').DynamoDBGetItemRequest} the request
 */
export function request(ctx) {
  const partyId = ctx.args?.args?.partyId || ctx.args.partyId
  const id = ctx.args?.args?.id || ctx.args.id

  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues({ partyId, id }),
  };
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
