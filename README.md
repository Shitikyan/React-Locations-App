# React Locations application

This is a simple react application, that fetches locations, displays. You can add, search and reset them.

## To run the application locally follow the steps bellow:

1. Clone the repository
2. **npm install** in root directory
3. Create **.env** file with the correct secret values
4. **npm start** in root directory

## env variables

- **REACT_APP_API_URL** - The api url, from where the application data comes from
- **REACT_APP_AWS_ACCESS_KEY_ID** - The AWS access key id wherever the api is deployed for signature v4 authentication
- **REACT_APP_AWS_SECRET_ACCESS_KEY** - The AWS secret access key wherever the api is deployed for signature v4 authentication
- **REACT_APP_AWS_REGION** - The AWS region wherever the api is deployed for signature v4 authentication
- **REACT_APP_IS_API_INTEGRATED** - enum value(1,0) specifying if the application should work with mocked(0) or api(1) data

## Amplify setup and CI/CD Configured

- AWS Amplify simplifies application deployments by connecting to your code repository and rolling out single workflows with each code commit.
- Amplify supports 3rd party tool integration like Github, Gitlab, and AWS CodeCommit repositories. 
- With the Amplify CLI, you can quickly add features to your app by tying it to other services like Amazon Cognito, AWS Appsync or AWS Lambda or S3.
