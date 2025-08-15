import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth-service';
import { catchError, map, mergeMap, tap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$: any;
  storeToken$: any;
  logout$: any;

  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  num = this.identity<number>(123);     // returns number
  str = this.identity<string>('hello'); // returns string

  identity<T>(value: T): T {
    return value;
  }

  constructor() {
    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => console.log('Login action received:', action)),
        mergeMap(({ username, password }) =>
          this.authService.login(username, password).pipe(
            map(token => AuthActions.loginSuccess({ token })),
            catchError((error) => of(AuthActions.loginFailure({ error })))
          )
        )
      )
    );

    this.storeToken$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.loginSuccess),
          tap(({ token }) => localStorage.setItem('token', token))
        ),
      { dispatch: false }
    );

    this.logout$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.logout),
          tap(() => localStorage.removeItem('token'))
        ),
      { dispatch: false }
    );
  }
}
