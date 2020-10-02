import { NextFunction, Request, Response } from 'express';
import HttpException from '../util/httpException';
import Logger from '../loaders/logger'
 
function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res
    .status(status)
    .send({
      status,
      message,
    })
  Logger.error('Error %o', error)
}
 
export default errorMiddleware;