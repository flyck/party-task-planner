import { gql } from '@apollo/client';

const updatedTask = gql`subscription updatedTask(
  $partyId: String!
) {
 updatedTask(
  partyId: $partyId
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

export default updatedTask
