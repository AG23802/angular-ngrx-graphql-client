import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, switchMap, take, throwError } from 'rxjs';
import { selectAccessToken, selectRefreshToken } from './store/auth.selectors';
import { AuthService } from './auth-service';
import { tap } from 'rxjs/operators';
import * as AuthActions from './store/auth.actions';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const store = inject(Store);
  const authService = inject(AuthService);

  // This prevents infinite loops by checking if the request is already for a token refresh
  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  return store.select(selectAccessToken).pipe(
    take(1),
    switchMap((accessToken) => {
      const authReq = accessToken
        ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
        : req;

      return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return store.select(selectRefreshToken).pipe(
              take(1),
              switchMap((refreshToken) => {
                if (!refreshToken) {
                  // If refresh token is missing, redirect to login
                  store.dispatch(AuthActions.logout());
                  return throwError(() => error);
                }

                return authService.refreshToken(refreshToken).pipe(
                  switchMap((tokenResponse) => {
                    const newAccessToken = tokenResponse.accessToken;
                    const newRefreshToken = tokenResponse.refreshToken;
                    
                    // Dispatch action to update store and localStorage
                    store.dispatch(AuthActions.setTokens({
                      accessToken: newAccessToken,
                      refreshToken: newRefreshToken
                    }));

                    // Retry original request with the new access token
                    const retryReq = req.clone({
                      setHeaders: { Authorization: `Bearer ${newAccessToken}` },
                    });
                    
                    return next(retryReq);
                  }),
                  catchError((refreshError) => {
                    // If refresh token fails, redirect to login
                    store.dispatch(AuthActions.logout());
                    return throwError(() => refreshError);
                  })
                );
              })
            );
          }
          return throwError(() => error);
        })
      );
    })
  );
};