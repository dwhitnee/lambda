/*global amazon */

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


function addAmazonLoginClickHandler( document, window, clientID, url ) {

  window.onAmazonLoginReady = function() {
    // https://developer.amazon.com/lwa/sp/create-security-profile.html
    amazon.Login.setClientId( clientID );
  };

  document.getElementById('LoginWithAmazon').onclick = function() {
    amazon.Login.authorize({ scope: 'profile' }, url);
    return false;
  };
};


var dwhitney_personal = "amzn1.application-oa2-client.04dc8af01ef1490e81c7ddb7f1a90c7d";

var dwhitney_amazon = "amzn1.application-oa2-client.20ca6ed98b0d4d31816588428f90d4ee";

addAmazonLoginClickHandler(
  document, window,
  dwhitney_amazon,
  "http://localhost:8080/lambda/index.html");

addAmazonLoginScript( document );
