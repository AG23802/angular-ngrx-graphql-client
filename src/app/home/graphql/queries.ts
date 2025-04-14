import { gql } from 'apollo-angular';

export const GET_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      photoURL
    }
  }
`;