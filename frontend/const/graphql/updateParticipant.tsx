import { gql } from '@apollo/client';

const updateParticipant = gql`mutation updateParticipant(
$args: UpdateParticipant!
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
