/* eslint-disable operator-linebreak */
const environment = {
  BASE_URL: process.env.REACT_APP_BASE_URL as string,
  API_URL: process.env.REACT_APP_API_URL ?? 'http://localhost:5000',
  AWS_ACCESS_KEY_ID: process.env.REACT_APP_AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_ACCESS_KEY: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string,
  AWS_REGION: process.env.REACT_APP_AWS_REGION as string,
  IS_API_INTEGRATED: process.env.REACT_APP_IS_API_INTEGRATED
    ? +process.env.REACT_APP_IS_API_INTEGRATED
    : 0,
  AWS_CLIENT_ID: process.env.REACT_APP_AWS_CLIENT_ID as string,
  AWS_CLIENT_SECRET: process.env.REACT_APP_AWS_CLIENT_SECRET as string,
};

export default environment;
