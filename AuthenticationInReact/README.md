# Authentication in React with JWTs, Access & Refresh Tokens

Authentication is crucial for god in security in any React application,
if u dont have authentication right in your application u going ship securty vulnerability and your user data
will going be ricked sokme attacker can access your user data .

## Traditionaly how React Application Work ?

As we see here user interAction with the React application and the application will send requests to the server
and the server will handle the request and send response to the React application and the React application will show the response to the user.

![alt text](/Authentication%20in%20%20React/src/assets/JWT.png)

in this case there is no direct connection between the user and the server and the server is not aware of the user.

The server will not resond for any request that it gets right thats not usually this works !

u arenot send the data from database to anyone that ask for it .
but the seerver should be aware of the user to resopond data and to know does the user have access to the data or not , does the user signed in ?? have Authanticated ? can actuly access it or not.
ensure the correct permission to get ,read do something with the data that spacific entry that they are trying to access .

All of this falls under the concept of Authorization or even verification that server
has authorized evry single request has to know hows requesting the data and then has to idintify that user
idintify permission ,verify that user
can actully do what they are trying to do.

IF the user can it return success response to the React application else return error response to the React application.
then the React application will show the response to the user in form when they rerender the ui.

then the user can take appropriate action based on the response.

for all of this to work we need to use JWTs (JSON Web Tokens) for authentication.
its a token that is encrypted that can store the data in aspescific user and can be used
by the server to actuallu vaidiate if that the user is validate if that request is valid or not.

jwts that u can set the data within dom they are all encrypted so
its safe to acutallu transmit around and u can also set the expiration date of the token
witch will allow u to expired the token after a certain period of time.
and required user to relogin ,Reet a new token before they can porceed
making more requests to the application its essential asecurity measures and
this tokens are pertty much the standard in authentication in React.

---

### We have two types of tokens: Access Token and Refresh Token.

This tokens will be used either by the server or the React application
to esintually identify and authenticate at the user then allow the user to make requests to the server

this Tokens will use within this process to actually creat a successful and robust authentication
for any given user in any given application with any server.

So how does this work ?

Lets consider the following scenario:
at this stage the user not authenticated may be open the application for the first time
and there no authenticated

they presented to sign-in form because let say the react application required them to be authenticated
by have an account befor they do anything so he singin in to form in this form user enter username and password
whatever then interact with react application to send the request to the server to authenticate the user and loginto the application.

the server received the request will give credentials from the user the email and password make some
checked that they are Correct in the correct Shape
then going to the database to see there is actually a user with that email and password is correct

and if only every checks out is the server actually going to consider the user logged in and
in that case the " user " is goning to do Tow things ::

1. going to take some data from the user maybe the user id and the user name maybe somthing else its alltogether
   it really depends flexible and it going to create a " Refresh token " from the user using that data

- Thats Refresh token the server will not send to the Frontend This is very very secret Token
  Should never be leaked for anyone outside of the server

- The server will Stroe the Refresh token in HTTP Only Cookies
  this mean that this cookie Cannt be accessed by the JavaScript
  mean only the server can set this cookie and only the server can Read this cookie

so React application or any javascript code maybe malicious code by som attacker will not be able to Read this cookie
because its Http Only cookies This the First layer in Security

2. The server will take either again some data from the user or going to take that refresh token
   and going to generate from that " Access token " then will send this Access token Through Response to the React application and the React application will charget to store and manging this access token

- This access token will going to be the key that allow the user to asintually to
  authenticate aginst the server

- This Token has to be passed along every single request that the react application makes to the server
  because that will be identifying who the user actually is

- Remember Access token Created by Refresh token wich Created by some data from the user
  and that how we can uniquely identify the specific user

- As long we have access token we can make requests in our React application on behalf of the user
  and those requests will are going to get validated in the server beacause is the
  validate the access token

- we can put expiration date short time on the access token and usually we do that For Security
  like give Access token for 15 minutes be valid then after 15 will be expired this token
  no to be valid anymore and need to have new one for the user keep interacting authanticated
  with application

- The refresh token because its Http Only cookies ONLY the server can Read this cookie WE give them longer
  expiration date like 30 days or 60 days anything its depend on your user case but gerneraly 30 days is pretty safe avarge that we can impliment.. be valid then after 30 days will be expired this token no to be valid anymore

### by this Tow Tokens we actully have everything that we need for all authentication the user and then keep the user authenticated

- The Refresh token going to consider the user to be authentication

# Access Token Where to Store ??

maybe in the Local Storage or Cookies ?? NO Its not Scure because really can be accessed by the attacker using JavaScript code

## So were u pout it ?

The save place for the access token is going to be in the Memory
thats mean the context of React Applications in " State "
thats it only local fot this React Application thats live in actual memory of the actual computer
the process that runing react Application.

will Sotre in memory the access token so that javaScript no access to it because its alot hard to access computer memory than its is to access the cookies or the local storage the memory safe enough to store the access token

### After the 15 minutes the access token is going to be expired What happen ? or what happen when user refresh the application ? waht do we do with this token ??

- Access token is responsiblity of the React Application , React Application reseve the access token from server
  and its resonsible for storing in the memory and actually its responsible for handling the case when the access token is going to be expired

### waht do we do with this token ??

in that case if the use refresh the application we are no longer have a token so actuallu will send undifined as a
token to the backend or if Still have a token but its expired we are going to send that token and the backend goging
to realize when it tries to verify the tokekn that its expired in any way we are going to have a Token that is goning
to fail the validation check on the server
and then what is the server going to do ??
instead the of loging the user out directly then in there its first going to check the refresh token in the HTTP Only Secure Cookies and if ther is a refresh token there is goning to try validate it and if its validate its going to generate a new access token and then send that through the response to the React application and the react application will charge to store in memory once again
and the react application will take this token and send it with every single request to the server

that is going to work until the user
refresh the application or the token expired after 15 minutes
and after that we will do the same thing again

the server will checke the refresh token again and if its valid
its going to revalidate that actually the access token and the reason why we do this ?
because we dont want to sign the user out every single time this access token is going to expire
beacause that would be horrible for the user experience

WE use this for security and convenience
and then we have this as abackup as the single source of truth of the actually
user authentication states

Finally we know now ::

- The server responsible for refreshing tokens hows generating the access token
  but the main responsibility is the verfiying and checking the refresh token

- The React Application Responsible for Storing the access token in the memory in state not in cookies or Local Storage

This is pretty safe bet for access token
And The user Throughout thus Mechanism can interact ether access token or refresh token that gets regenerated from the server
and actually the user be authenticated and identified against the server so the server will know who the user actually is thats making every single request .

#### The End...
