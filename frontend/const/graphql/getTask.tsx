import { gql } from '@apollo/client';

const getTask = gql`query getTask(
  $partyId: String!
  $id: String!
) {
 getTask(
  partyId: $partyId
  id: $id
) {
    id
    title
    description
    status
    assignee {
      name
    }
  }
}`

export default getTask
