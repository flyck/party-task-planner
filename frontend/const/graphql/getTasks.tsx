import { gql } from '@apollo/client';

const getTasks = gql`query getTasks(
  $partyId: String!
  $limit: Int
  $nextToken: String
) {
 getTasks(
  partyId: $partyId
  limit: $limit
  nextToken: $nextToken
  ) {
    items {
      id
      title
      description
      status
      assignee {
        name
      }
    }
    nextToken
  }
}`

export default getTasks
