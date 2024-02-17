import { gql } from '@apollo/client';

const deletedTask = gql`subscription deletedTask(
  $partyId: String!
) {
 deletedTask(
  partyId: $partyId
  ) {
    id
  }
}`

export default deletedTask
