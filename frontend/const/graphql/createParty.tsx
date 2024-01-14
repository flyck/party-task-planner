import { gql } from '@apollo/client';

const createParty = gql`mutation createParty(
  $args: CreateParty!
) {
 createParty(args: $args) {
    id
  }
}`

export default createParty
