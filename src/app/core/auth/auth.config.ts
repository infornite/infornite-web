import { ENV } from '@env/env.config';

  interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
    RESPONSE_TYPE: string;
  };
  
  export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'darJqhxkzy0hi6PUQTCAWKFlH7hO2a8w',
    CLIENT_DOMAIN: 'n4nite.au.auth0.com',
    AUDIENCE: 'https://fornite.com/',
    REDIRECT: `${ENV.BASE_URI}/discover`,
    SCOPE: 'openid profile email',
    RESPONSE_TYPE: 'token id_token',
    //REDIRECT:`${window.location.origin}`,
  };

  