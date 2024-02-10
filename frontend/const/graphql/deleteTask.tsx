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
  }
}`

export default deleteTask
