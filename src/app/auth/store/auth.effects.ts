import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth-service';
import { catchError, map, mergeMap, tap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$: any;
  storeAccessToken$: any;
  logout$: any;

  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  num = this.identity<number>(123); // returns number
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
            map(({accessToken, refreshToken}) => AuthActions.loginSuccess({ accessToken, refreshToken })),
            catchError((error) => of(AuthActions.loginFailure({ error })))
          )
        )
      )
    );

    this.storeAccessToken$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.loginSuccess),
          tap(({ accessToken, refreshToken }) => {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
          })
        ),
      { dispatch: false }
    );

    this.logout$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.logout),
          tap(() => localStorage.removeItem('accessToken'))
        ),
      { dispatch: false }
    );
  }
}
