### JSON Web Tokens

JSON Web Token (JWT, pronounced "jot") is a type of token-based authentication used in space-constrained environments such as HTTP Authorization headers. Use this tag for questions relating to the configuration, generation and usage of JWTs in your code.

The solution I came up, to handle user data with an Identity Provider Service (IDP). The IDP is responsible for signing JWTs with symmetrical keys (rs256) and storing user information. The Identity Provider also has an open endpoint which will expose the public key in the form of a JWK (JSON Web Key) which is used to sign the JWT, This endpoint can be used to validate issued keys by any other service (ideally the external service would cache the JWK to reduce traffic to the IDP).

But This also poses another issue, that is we will have to implement more code to validate the tokens with the JWK endpoint. This is where an API Gateway comes in, The API gateway sits between the frontend client and the API server acting as a checkpoint. The API Gateway caches the JWK using the IDP endpoint and validates all the incoming requests. This means we would only have to implement features like JWK validation, rate-limiting, and SSL only to the API Gateway and we will not have to rely on the internal services for implementing these. Plus another improvement to the API Gateway would be to write the decoded JWT data onto the headers so the API Gateway can pass the decoded data for example: `x-jwt-email: person@email.com` directly to the internal services.

I found inspiration for this implementation from various sources and this was one of the first system designs that have completed building so let me know if there are any loopholes or improvements that could be implemented.

Authentication approach for separate microservices APIs:

[Use JWT to authenticate separate API Microservice](https://stackoverflow.com/questions/56147281/use-jwt-to-authenticate-separate-api-microservice)

This is is the first time I implemented my authentication and I wanted to make it as right as possible since it’s the most vital part of the security system.

[Authentication fundamentals](https://www.youtube.com/watch?v=fbSVgC8nGz4)

The above video about authentication concepts got me great insight into how modern authentication systems works.

### Identity Provider Architecture

The Identity and access management provider (IDP for short) acts as a gatekeeper in between Anthane’s services to regulate access to only authorized users. One of its primary goals is to be a Single Sign On (SSO) service where users wouldn’t have to go through the login screen each time they try to access services.

![[high-level.png]]
### Another view of the architecture

![[services-link.png]]

### Authentication Flow

![[auth-flow.png]]