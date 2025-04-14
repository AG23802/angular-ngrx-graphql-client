import { gql } from 'apollo-angular';

export const CREATE_USER_MUTATION = gql`
  mutation ($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;