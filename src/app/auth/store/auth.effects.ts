import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth-service';
import { catchError, map, mergeMap, tap, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$: any;
  storeToken$: any;
  logout$: any;

  constructor(private actions$: Actions, private authService: AuthService) {
    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => console.log('Login action received:', action)),
        mergeMap(({ username, password }) =>
          this.authService.login(username, password).pipe(
            map((data) => AuthActions.loginSuccess({ token: data.token })),
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
