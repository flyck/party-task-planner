import { gql } from '@apollo/client';

const createTask = gql`mutation createTask(
$args: CreateTask!
) {
 createTask(
  args: $args
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

export default createTask
