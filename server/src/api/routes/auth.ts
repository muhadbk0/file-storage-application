import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import AuthService from '../../services/auth'
import middlewares from '../../middlewares'
import validator from '../validator'
import logger from '../../loaders/logger'
import { IUser } from '../../interfaces';
const route = Router()

export default (app: Router) => {
  app.use('/auth', route)
  route.post(
    '/login',
    validator.login,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = Container.get(AuthService)
        const { data, status } = await authServiceInstance.login(req.body as IUser)
        return res.status(status).json(data)
      } catch (e) {
        logger.error('🔥 error: %o', e)
        return next(e)
      }
    }
  )

  route.post(
    '/register', 
    validator.register,
    //middlewares.attachCurrentDevice, 
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = Container.get(AuthService)
        const result = await authServiceInstance.register(req.body as IUser)
        return res.json(result).status(201)
      } catch (e) {
        logger.error('🔥 error: %o', e)
        return next(e)
      }
    }
  )

  route.post(
    '/logout',
    middlewares.isAuth,
    (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
      try {
        // AuthService.Logout(req.user) do some clever stuff
        //jwtr.destroy(token)
        return res.status(200).end()
      } catch (e) {
        logger.error('🔥 error %o', e)
        return next(e)
      }
    }
  )

  route.post(
    '/logoutall',
    middlewares.isAuth,
    (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
      try {
        // AuthService.Logout(req.user) do some clever stuff
        return res.status(200).end()
      } catch (e) {
        logger.error('🔥 error %o', e)
        return next(e)
      }
    }
  )
}
