import { gql } from '@apollo/client';

const deletedParticipant = gql`subscription deletedParticipant(
  $partyId: String!
) {
 deletedParticipant(
  partyId: $partyId
) {
    id
    name
    email
    invitationSent
  }
}`

export default deletedParticipant
