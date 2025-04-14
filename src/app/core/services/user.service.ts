import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_USERS_QUERY } from '../../home/graphql/queries';
import { CREATE_USER_MUTATION } from '../../home/graphql/mutations';
import { } from '../../auth/graphql/queries';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private fullUrl = environment.graphqlApi;
  constructor(private apollo: Apollo) { }

  getUsers(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_USERS_QUERY,
        context: {
          uri: this.fullUrl,
        },
      })
      .valueChanges.pipe(map((result: any) => result.data.users));
  }

  createUser(name: string, email: string): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      context: {
        uri: this.fullUrl,
      },
      variables: {
        name: name,
        email: email,
      },
    }).pipe(map((result: any) => result.data.createUser));
  }
}
