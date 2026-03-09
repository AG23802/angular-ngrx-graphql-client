import {
  ApplicationConfig,
  provideZoneChangeDetection,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { authInterceptor } from './auth/auth-interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { authReducer } from './auth/store/auth.reducer';
import { routes } from './app.routes';

import {
  MSAL_INSTANCE,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';

import { PublicClientApplication } from '@azure/msal-browser';

export function MSALInstanceFactory() {
  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: 'd1f9a695-3b94-4f9a-a0c6-5508c475df0b',
      authority: 'https://Fruitlycustomers.ciamlogin.com/36a16460-9d65-47a5-9de5-338f2fca444a',
      redirectUri: 'http://localhost:4200',
    },
    cache: {
      cacheLocation: 'localStorage'
    }
  });

  // MSAL v3+ requires this call. Without it, popups won't trigger.
  msalInstance.initialize(); 
  
  return msalInstance;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: 'http://localhost:8080/graphql' }),
        cache: new InMemoryCache(),
      };
    }),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },

    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};
