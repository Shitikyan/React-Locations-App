const environment = {
  AWS_CLIENT_ID: process.env.REACT_APP_AWS_CLIENT_ID as string,
  AWS_AUTH_URL: process.env.REACT_APP_AUTH_URL as string,
  APOLLO_CLIENT_LINK: process.env.REACT_APP_APOLLO_CLIENT_LINK as string,
  AWS_REDIRECT_URL: process.env.REACT_APP_AWS_REDIRECT_URL as string,
};

export default environment;
