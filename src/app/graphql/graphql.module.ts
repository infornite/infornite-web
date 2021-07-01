import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, concat, ApolloLink} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
//const uri = 'http://localhost:000/'//'https://graphql.fauna.com/graphql'; // <-- add the URL of the GraphQL server here

const uri = environment.API_URL

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer fnAD_FmMD_ACDI7NEhdMDbvx2OZICiGaj-XSHbrh'
      ),
    });

    return forward(operation);
  });

  return {
    link: concat(authMiddleware, httpLink.create({ uri })),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
