import {Request} from 'express'
import jwt from 'express-jwt';
import config from '../config';

const getTokenFromHeader = (req:Request) => {

  if(req.headers){
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  }
  return null;
};

const isAuth = jwt({
  secret: config.jwtSecret, // The _secret_ to sign the JWTs
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, // How to extract the JWT from the request
});

const isHaveAuth = jwt({
  secret: config.jwtSecret, // The _secret_ to sign the JWTs
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, // How to extract the JWT from the request
  credentialsRequired: false,
});

export  {isAuth ,isHaveAuth};