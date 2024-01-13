import { gql } from '@apollo/client';

const updatedParty = gql`subscription updatedParty(
  $id: String!
) {
 updatedParty(
  id: $id
) {
    id
    title
    description
    location
    date
  }
}`

export default updatedParty
