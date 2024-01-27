import { gql } from '@apollo/client';

const deleteTask = gql`mutation deleteTask(
  $partyId: String!
  $id: String!
) {
 deleteTask(
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

export default deleteTask
