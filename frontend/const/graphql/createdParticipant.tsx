import { gql } from '@apollo/client';

const createdParticipant = gql`subscription createdParticipant(
  $partyId: String!
) {
 createdParticipant(
  partyId: $partyId
) {
    id
    name
    email
    invitationSent
  }
}`

export default createdParticipant
