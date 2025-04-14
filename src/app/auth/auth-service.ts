import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { LOGIN_MUTATION } from './graphql/mutations';
import { Apollo } from "apollo-angular";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fullUrl = environment.graphqlApi;
  constructor(private apollo: Apollo) { }

  login(username: string, password: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          username,
          password,
        },
        context: {
          uri: this.fullUrl,
        },
      })
      .pipe(
        map((result: any) => {
          return result.data?.login;
        })
      );
  }
}