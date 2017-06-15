/*global AWS */

// Initialize the Amazon Cognito credentials provider
AWS.config.region = "us-west-2";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:e6d9393e-8788-43b0-a7cd-9badc03687d8',
  Logins: {
    'www.amazon.com': 'Amazon Access Token'  // access_token is provided in the query string
  //   // http://docs.aws.amazon.com/cognito/latest/developerguide/amazon.html
  }
});

// To allow more functionality in the Lambda call, add roles to https://console.aws.amazon.com/iam/home?region=us-west-2#/roles/Cognito_FirstPoolUnauth_Role


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
      console.log(err, err.stack);
      response = '<div class="alert alert-danger">' + err + '</div>';
    } else {
      var output = JSON.parse( data.Payload );
      response = '<div class="alert alert-success">' + output.body + '</div>';
    }

    result.innerHTML = response;
  };

  lambda.invoke( body, callback );
}



// var form = document.getElementById('greetingsForm');
// form.addEventListener('submit', function(evt) {
//   evt.preventDefault();
//   returnGreetings();
// });

function getAccessToken() {
  var urlParams = window.location.search.split(/[?&]/).slice(1).map(
    function( paramPair ) {
      return paramPair.split(/=(.+)?/).slice(0, 2);
    }).reduce( function( obj, pairArray ) {
      obj[pairArray[0]] = pairArray[1];
      return obj;
    }, {});

  var el = document.getElementById("access_token");
  el.innerHTML = urlParams.access_token;
}


firstLambaFunction();


// debug
getAccessToken();
