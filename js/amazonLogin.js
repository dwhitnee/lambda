/*global amazon, AWS */

/**
 *  Create a login with amazon button and configure it
 *  Attaches to a div called "amazon-root"
 */

// How is this different than creating a script tag?
// https://developer.amazon.com/public/apis/engage/login-with-amazon/docs/install_sdk_javascript.html

function addAmazonLoginScript(document) {
  var a = document.createElement('script');
  a.type = 'text/javascript';
  a.async = true;
  a.id = 'amazon-login-sdk';
  a.src = 'https://api-cdn.amazon.com/sdk/login1.js';
  document.getElementById('amazon-root').appendChild(a);
};





function addAmazonLoginClickHandler( window, clientID, url, loginCallback ) {

  window.onAmazonLoginReady = function() {
    // https://developer.amazon.com/lwa/sp/create-security-profile.html
    amazon.Login.setClientId( clientID );
  };
  var document = window.document;

  document.getElementById("AmazonLogout").onclick = function() {
    amazon.Login.logout();
  };


  document.getElementById('LoginWithAmazon').onclick = function() {

    // amazon.Login.authorize({ scope: 'profile' }, url);

    amazon.Login.authorize( {scope: "profile"}, function(resp) {
      if (!resp.error) { // logged in
        var creds = AWS.config.credentials;
        // creds.params.RoleArn =
        //   'arn:aws:iam::1234567890:role/MyApplication-CognitoAuthenticated';
        creds.params.Logins = {
          'www.amazon.com': resp.access_token
        };

        // manually expire credentials so next request will fire a refresh()
        creds.expired = true;
      }
      if (loginCallback) {
        loginCallback( resp.error, creds.params.Logins['www.amazon.com'] );
      }

    });

    return false;
  };
};


addAmazonLoginScript( document );
