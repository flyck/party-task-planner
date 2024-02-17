import { gql } from '@apollo/client';

const deleteTask = gql`mutation deleteTask(
  $partyId: String!
  $id: String!
) {
 deleteTask(
  partyId: $partyId
  id: $id
  ) {
    partyId
    id
  }
}`

export default deleteTask
