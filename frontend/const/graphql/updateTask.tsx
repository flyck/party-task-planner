import { gql } from '@apollo/client';

const updateTask = gql`mutation updateTask(
$args: UpdateTask!
) {
 updateTask(
  args: $args
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

export default updateTask
