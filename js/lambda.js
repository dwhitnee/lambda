/*global AWS */

// plop this into https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/first?tab=code

'use strict';

var value = 42;
var now = new Date();

var env = process.env.testEnvVar;

var AWS = require('aws-sdk');

// This uses the lambda creator's creds, not the Cognito creds or Identity
// how to get identity here?

exports.handler = (event, context, callback) => {
  console.error("Not really an error");

  var s3 = new AWS.S3();
  s3.listBuckets({}, function( err, data ) {
    if (err) {
      console.error( err );
    } else {
      console.log( data );
    }

    var msg = "It's " + now.toDateString() + " and env value = " + env;

    var response = {
      statusCode: 200,
      headers: {},
      body: JSON.stringify( data )
    };

    callback(null, response );
  });

};
