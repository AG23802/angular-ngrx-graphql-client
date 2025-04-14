import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOGIN_MUTATION, CREATE_USER_MUTATION } from '../graphql/mutations';
import { GET_USERS_QUERY } from '../graphql/queries';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private fullUrl = environment.graphqlApi;
  constructor(private apollo: Apollo, private http: HttpClient) {}

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

  getData() {
    return this.http.get('http://localhost:8080/protected/data');
  }
}
