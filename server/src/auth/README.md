# Auth module

## Routes

## AuthGuards
By default all Routes are protected by the JWTAuthGuard which checks if a valid JWT was provided
### Making a Route public
In order to make a route which can be accessed without authentication use the @NoAuth() decorator from this module (can be imported from no-auth.decorator.ts)
