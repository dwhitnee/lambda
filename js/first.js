/*global AWS, AWSCognito */

// Initialize the Amazon Cognito credentials provider
AWS.config.region = "us-west-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:e6d9393e-8788-43b0-a7cd-9badc03687d8',
  Logins: {
    'www.amazon.com': "AMAZON_TOKEN"  // access_token is provided in the query string
  //   // http://docs.aws.amazon.com/cognito/latest/developerguide/amazon.html
  }
});

// To allow more functionality in the Lambda call, add roles to https://console.aws.amazon.com/iam/home?region=us-west-2#/roles/Cognito_FirstPoolUnauth_Role


AWS.config.credentials.params.Logins['www.amazon.com'] =
  getAccessTokenFromRequest();

console.log(AWS.config.credentials.params.Logins['www.amazon.com']  );


// Facebook
/*
FB.login(function (response) {
  if (response.authResponse) { // logged in
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:1699ebc0-7900-4099-b910-2df94f52a030',
      Logins: {
        'graph.facebook.com': response.authResponse.accessToken
      }
    });

    dynamo = new AWS.DynamoDB();

    console.log('You are now logged in.');
  } else {
    console.log('There was a problem logging you in.');
  }
});
*/


/*
var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            // Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer
            console.log('idToken + ' + result.idToken.jwtToken);
        },

        onFailure: function(err) {
            alert(err);
        },

    });
*/

var USER_POOL = "us-west-2:e6d9393e-8788-43b0-a7cd-9badc03687d8";
var AWS_CLIENT_ID = "amzn1.application-oa2-client.20ca6ed98b0d4d31816588428f90d4ee";
var COGNITO_URL = "cognito-idp.us-west-2.amazonaws.com/" + USER_POOL;

function foo() {
  var data = {
    UserPoolId : USER_POOL,
    ClientId : AWS_CLIENT_ID
  };

  var userPool =
        new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);

  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession( function(err, session) {
      if (err) {
        alert(err);
        return;
      }
      console.log('session validity: ' + session.isValid());

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId : USER_POOL,
        Logins : {
          COGNITO_URL: session.getIdToken().getJwtToken()
        }
      });

      // Instantiate aws sdk service objects now that the credentials have been updated.
      // example: var s3 = new AWS.S3();

    });
  }
};

foo();


































var lambda = new AWS.Lambda();


function firstLambaFunction() {

/*
  var name = document.getElementById('name');

  if (name.value == null || name.value == '') {
    input = {};
  } else {
    input = {
      name: name.value
    };
  }
*/

  var input = { hello: "world" };

  var body = {
    FunctionName: 'first',
    Payload: JSON.stringify( input )
  };

  var callback = function(err, data) {
    var result = document.getElementById('output');
    var response;
    if (err) {
      console.log( err, err.stack );
      response = '<div class="alert alert-danger">' + err + '</div>';
    } else {
      var output = JSON.parse( data.Payload );
      response = '<div class="alert alert-success">' + output.body + '</div>';
    }

    result.innerHTML = response;
  };

  lambda.invoke( body, callback );
}







// What does this do?  When must it be run?
// Is this basically a CUSTOMERS table?
/*

===Developer Preview===

function retrieveData() {

  AWS.config.credentials.get(
    function() {
      var syncManager = new AWS.CognitoSyncManager();

      syncManager.openOrCreateDataset('testData', function(err, dataset) {
        console.log("testData set synced");

        dataset.get('testKey', function(err, value) {
        console.log('myRecord: ' + value);
        });

        dataset.put('newKey', 'newValue', function(err, record) {
          console.log("Put " + record );
        });

        dataset.remove('oldKey', function(err, record) {
          console.log("Removed " + record );
        });

      });
    }
  );
}
*/

// var form = document.getElementById('greetingsForm');
// form.addEventListener('submit', function(evt) {
//   evt.preventDefault();
//   returnGreetings();
// });

function getAccessTokenFromRequest() {
  var urlParams = window.location.search.split(/[?&]/).slice(1).map(
    function( paramPair ) {
      return paramPair.split(/=(.+)?/).slice(0, 2);
    }).reduce( function( obj, pairArray ) {
      obj[pairArray[0]] = pairArray[1];
      return obj;
    }, {});

  var el = document.getElementById("access_token");
  el.innerHTML = urlParams.access_token;

  return decodeURIComponent( urlParams.access_token );
}


firstLambaFunction();


// debug


// retrieveData();
