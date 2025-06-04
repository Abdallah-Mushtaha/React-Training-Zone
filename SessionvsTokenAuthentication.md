# Session vs Token Authentication

Two main ways to get the job done are Session and Token Authentication.  
The traditional way is Cookie-Based Session (Server-Side Session).

The process begins when the user fills in the email and password and submits to the server.  
Then, save the Session on the server side (Database).  
Then respond with the Session ID.  
The Session ID will be saved on the client side in the cookie.  
Cookie, which is a space in the browser to save key-value pairs,  
that the browser will send the key-value pair to the server on each request.

In other words, we have a stateful session between the Frontend and the Backend.  
This process looks great, but there are some drawbacks!!

They can be easily hacked by known Cross-Site Request Forgery,  
where the attacker points the user to a site they are in to perform an action they didn’t want to perform,  
like submitting a payment or changing a password.

Although the risk is very low, especially if you use a modern framework like Django.

The bigger problem is that you need to store the Session ID in the database  
or keep it in memory on the server because most applications are scaled horizontally.  
This can be a huge bottleneck in production, and that brings us to:

## Token-Based Authentication

Which solves the problem of Cross-Site Request Forgery  
but introduces its own set of challenges.

The process begins the same: the user fills in the email and password and submits to the server.  
Then instead of saving the Session on the server side (Database),  
it generates a JSON Web Token (JWT).  
The JWT will be created with the private key on the server side.

Then it's sent back to the browser, where it's normally kept in the local storage.

On future requests, the JWT will be added to the Authorization header,  
prefixed by "Bearer".  
The server then only needs to validate the signature.  
There's no need for the database to look up somewhere else in the infrastructure.

And that’s way more efficient when dealing with distributed systems in the cloud.  
However, tokens can still be hijacked by attackers.  
And they can also be difficult to invalidate.  
And they can’t be used to authenticate users  
in the background on the server.

# The important things to understand

In the session, the authentication is still handled on the server side,  
while the tokens are managed on the client side.
