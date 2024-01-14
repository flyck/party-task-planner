import { gql } from '@apollo/client';

const updateParty = gql`mutation updateParty(
  $args: UpdateParty!
) {
  updateParty(args: $args) {
    id
    title
    description
    location
    date
  }
}`

export default updateParty
