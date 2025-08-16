import { inject, Injectable } from '@angular/core';
import { GET_CITIES_QUERY } from '../../auth/graphql/queries';
import { map, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apollo = inject(Apollo);

  getData(): Observable<any> {
    return this.apollo.query({
    query: GET_CITIES_QUERY,
    fetchPolicy: 'network-only' // Ensures the query always goes to the network
  }).pipe(
    map((result: any) => result.data.cities)
  );
  }
}

