<!-- Answers to the Short Answer Essay Questions go here -->
1. Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

    Middleware - function you can plug which ties two parts of the application. body-parser is a middleware function. We can specifically tell the route handler to use middleware using the third parameter using some function.
    
    web Tokens - session storage contains tokens. The token is used during every single requests. This token is stored at every login and the user gets the token back. Session storage is ability to store information about the use that the client will hold onto at every request. The token can be time based where application might force you to log out after certain period of time. 

    bcrypt - It is a password hashing function used to protect our passwords by encrypting them that the time it takes for attacks such as dictionary attacks to be successful is no longer practical or feasible. 


2. What does bcrypt do in order to prevent attacks?
    
     It encrypts our password using a long random string produced by the browswer called salt, provides a hash to convert our password into a long string and each hash can be manipulated to make it take longer to perform the hash to slow down attacks. The time can also simply be increased to account for faster computers and computing technology. 

3. What are the three parts of the JSON Web Token?
    
    The three parts of a json web token include header, payload and a signature. 