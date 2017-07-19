// plop this into https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/first?tab=code

'use strict';

var value = 42;
var now = new Date();

var env = process.env.testEnvVar;

// read from dynamo?

exports.handler = (event, context, callback) => {
    console.error("Not really an error");

    var msg = "It's " + now.toDateString() + " and env value = " + env;

    var response = {
        statusCode: 200,
        headers: {},
        body: JSON.stringify( msg )
    };

    callback(null, response );
};
