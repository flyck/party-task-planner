import { gql } from '@apollo/client';

const createParticipant = gql`mutation createParticipant(
$args: CreateParticipant!
) {
 createParticipant(
  args: $args
  ) {
    partyId
    id
    name
    email
    invitationSent
  }
}`

export default createParticipant
