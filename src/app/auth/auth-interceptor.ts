// core/auth-interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, take } from 'rxjs';
import { selectToken } from './store/auth.selectors'; // <- create this selector!

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  return store.select(selectToken).pipe(
    take(1), // Only take the latest token once
    exhaustMap((token) => {
      const authReq = token
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          })
        : req;

      return next(authReq);
    })
  );
};
