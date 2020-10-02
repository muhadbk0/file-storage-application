import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import middlewares from '../../middlewares'
import UserService from '../../services/user'
import { IUser } from '../../interfaces'
import validator from '../validator'
import upload from '../../middlewares/mediaupload'
import paramOptions from '../../util/paramOptions'

const route = Router();
export default (app: Router) => {
  app.use('/users', route)
  route.get('/search/:text', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userServiceInstance = Container.get(UserService)
      const options = paramOptions(req);
      const data = await userServiceInstance.search(req.currentUser as IUser, req.params.text as string, options)
      return res.json(data).status(200);
    }
    catch (e) {
      return next(e);
    }
  });
  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userServiceInstance = Container.get(UserService)
      const options = paramOptions(req);
      const data = await userServiceInstance.getUserProfile(req.currentUser as IUser, req.currentUser as IUser, options)
      return res.json(data).status(200);
    }
    catch (e) {
      return next(e);
    }
  });
  route.put('/me', validator.userUpdate, middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userServiceInstance = Container.get(UserService)
      const data = await userServiceInstance.update(req.currentUser as IUser, req.body as IUser)
      return res.json(data).status(200);
    }
    catch (e) {
      return next(e);
    }
  });

  route.put('/me/avatar', middlewares.isAuth, middlewares.attachCurrentUser, upload.single("file"), async (req: Request, res: Response) => {
    const userServiceInstance = Container.get(UserService)
    const data = await userServiceInstance.updateAvatar(req.currentUser as IUser, req.file.originalname)
    return res.json(data).status(200);
  });

  route.get('/profile/:id', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userServiceInstance = Container.get(UserService)
      const options = paramOptions(req);
      const data = await userServiceInstance.getUserProfile({ _id: req.params.id } as IUser, req.currentUser as IUser, options)
      return res.json(data).status(200);
    }
    catch (e) {
      return next(e);
    }
  });

};