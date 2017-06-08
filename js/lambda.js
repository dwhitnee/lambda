// plop this into https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/first?tab=code

var value = 42;
var now = new Date();

var env = process.env.testEnvVar;

// read from dynamo?

exports.handler = (event, context, callback) => {
    console.error("Not really an error");

    var response = "It's " + now.toDateString() + " and env value = " + env;

    var responseObj = {
        statusCode: 200,
        headers: {},
        body: JSON.stringify( response )
    };

    callback(null, responseObj );
};
