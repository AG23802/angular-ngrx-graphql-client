import { gql } from 'apollo-angular';

export const CITY_ADDED_SUBSCRIPTION = gql`
  subscription {
    cityAdded {
      id
      name
      code
      country
    }
  }
`;