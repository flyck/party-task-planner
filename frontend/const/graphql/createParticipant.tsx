import { gql } from '@apollo/client';

const createParticipant = gql`mutation createParticipant(
$args: CreateParticipantInput!
) {
 createParticipant(
  args: $args
  ) {
    id
    name
    email
  }
}`

export default createParticipant
