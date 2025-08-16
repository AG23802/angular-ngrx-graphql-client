import { gql } from 'apollo-angular';

export const GET_CITIES_QUERY = gql`
  query {
    cities(page: 0, size: 5, nameFilter: "Zürich") {
      id
      code
      name
      country
    }
  }
`;