import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, split } from '@apollo/client/core';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './core/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]) // ✅ This is the key
    ),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      // Create an http link:
      const http = httpLink.create({
        uri: 'http://localhost:3000/graphql',
      });
     
      // Create a WebSocket link:
      const ws = new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:3000/graphql',
        }),
      );
     
      // Using the ability to split links, you can send data to each link
      // depending on what kind of operation is being sent
      const link = split(
        // Split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === Kind.OPERATION_DEFINITION &&
            definition.operation === OperationTypeNode.SUBSCRIPTION
          );
        },
        ws,
        http,
      );
     
      return {
        link,
        cache: new InMemoryCache(),
        // other options...
      };
    })
  ]
};

const ws = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/graphql',
  }),
);
