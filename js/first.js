/*global AWS, addAmazonLoginClickHandler */


var ACCOUNT_ID = "671931848375";  // why?
var USER_POOL = "us-west-2:e6d9393e-8788-43b0-a7cd-9badc03687d8";
var AWS_CLIENT_ID = "amzn1.application-oa2-client.20ca6ed98b0d4d31816588428f90d4ee";
var COGNITO_URL = "cognito-idp.us-west-2.amazonaws.com/" + USER_POOL;

  var dwhitney_personal = "amzn1.application-oa2-client.04dc8af01ef1490e81c7ddb7f1a90c7d";



// Initialize the Amazon Cognito credentials provider
AWS.config.update({
  region: "us-west-2",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: USER_POOL
    // RoleArn: "arn:aws:iam::671931848375:role/Cognito_FirstPoolUnauth_Role",
    // AccountId: ACCOUNT_ID
  })
});

function loginHandler( err, token ) {
  if (err) {
    console.error( err );
  } else {
    console.log("Logged in with " + token );
    checkUser( token );
  }
}


function initLogin() {
  // from amazonLogin.js
  addAmazonLoginClickHandler( window, AWS_CLIENT_ID,
                              "http://localhost:8080/lambda/index.html",
                              loginHandler
  );
}
initLogin();




// To allow more functionality in the Lambda call, add roles to https://console.aws.amazon.com/iam/home?region=us-west-2#/roles/Cognito_FirstPoolUnauth_Role

// http://docs.aws.amazon.com/cognito/latest/developerguide/amazon.htm





/*
var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
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





// http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-browser-credentials-cognito.html
// http://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html
// https://aws.amazon.com/blogs/mobile/integrating-amazon-cognito-user-pools-with-api-gateway/




function getCurrentUser() {
  var data = {
    UserPoolId : USER_POOL,
    ClientId : AWS_CLIENT_ID
  };
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html

  var userPool =
        new AWS.CognitoIdentityServiceProvider.CognitoUserPool(data);

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
          [COGNITO_URL]: session.getIdToken().getJwtToken()
        }
      });

      // Instantiate aws sdk service objects now that the credentials have been updated.
      // example: var s3 = new AWS.S3();

    });
  }
};

// getCurrentUser();



// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html

function checkUser( userToken ) {
  var params = {
    AccessToken: userToken
  };

  var cognito = new AWS.CognitoIdentityServiceProvider()  ;

  cognito.getUser( params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
};


if (AWS.config.credentials.params.Logins) {
  checkUser (AWS.config.credentials.params.Logins['www.amazon.com']);
}




//---------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------





var lambda = new AWS.Lambda();


function firstLambaFunction() {


  // var name = document.getElementById('name');

  // if (name.value == null || name.value == '') {
  //   input = {};
  // } else {
  //   input = {
  //     name: name.value
  //   };
  // }


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



firstLambaFunction();


// debug

// retrieveData();























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
