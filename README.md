This project is a stardart Oauth2 implementation (Just the auth server)
It's a working in progress

<p>

    This is an auth code default implementation, it uses PKCE to secure that the tokens are 
    valid. This implementation does identity validation using clientSecret, if you use an SPA
    this won't work because SPA's doesn't get clientSecrets (SPA's are insecure by default), but
    you still can use this work to authenticate SPA's because uses PKCE

</p>

<br />
Features
<ol>
    <li>Create user</li>
    <li>Authenticate user</li>
    <li>Issue tokens</li>
    <li>Validate tokens</li>
<ol>
<p> you must create an .env file to set your PORT </p>
