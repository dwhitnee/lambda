# lambda
AWS Lambda tests


# How to create a web page to call a AWS Lambda function.

* Create an AWS Cognito User Pool with unauthed and authed roles that can call different Lambda functions that may call other AWS services (DynamoDB say).

* Create Cognito Federated Pool: https://us-west-2.console.aws.amazon.com/cognito/federated?region=us-west-2
** Two Roles will be created.  Go to IAM console and add the AWSLambdaRole policy to your Cognito Roles.

* Upload js/lambda.js to a function in https://us-west-2.console.aws.amazon.com/lambda
