import { gql } from '@apollo/client';

const updatedParticipant = gql`subscription updatedParticipant(
  $partyId: String!
) {
 updatedParticipant(
  partyId: $partyId
) {
    id
    name
    email
    invitationSent
  }
}`

export default updatedParticipant
