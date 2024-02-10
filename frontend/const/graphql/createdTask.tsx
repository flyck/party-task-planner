import { gql } from '@apollo/client';

const createdTask = gql`subscription createdTask(
  $partyId: String!
) {
 createdTask(
    partyId: $partyId
  ) {
    partyId
    id
    title
    status
    assignee {
      name
    }
    description
  }
}`

export default createdTask
