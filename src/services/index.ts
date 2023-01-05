import axios from 'axios';
import environment from '../environment';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';

export const axiosHandler = async (method: string, url: string, data?: any) => {
  const sigv4 = new SignatureV4({
    service: 'execute-api',
    region: environment.AWS_REGION,
    credentials: {
      accessKeyId: environment.AWS_ACCESS_KEY_ID,
      secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
    },
    sha256: Sha256,
  });

  const API_URL = `${environment.API_URL}/${url}`;
  const apiUrl = new URL(API_URL);

  const signed = await sigv4.sign({
    method,
    hostname: apiUrl.host,
    path: apiUrl.pathname,
    protocol: apiUrl.protocol,
    headers: {
      host: apiUrl.host,
    },
  });

  return await axios({ ...signed, url: API_URL, data });
};

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
