import { gql } from '@apollo/client';

const updateParticipant = gql`mutation updateParticipant(
$args: UpdateParticipantInput!
) {
 updateParticipant(
  args: $args
  ) {
    partyId
    id
    name
    email
    invitationSent
  }
}`

export default updateParticipant
