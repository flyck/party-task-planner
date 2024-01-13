import { gql } from '@apollo/client';

const createParticipant = gql`mutation createParticipant(
$args: CreateParticipantInput!
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
