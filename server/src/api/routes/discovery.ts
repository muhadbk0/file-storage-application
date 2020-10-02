import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import middlewares from '../../middlewares'
import DiscoveryService from '../../services/discovery'
import paramOptions from '../../util/paramOptions'
import { IUser } from '../../interfaces'

const route = Router();
export default (app: Router) => {
  app.use(route)
   
  route.get('/home', middlewares.isHaveAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const discoveryServiceInstance = Container.get(DiscoveryService)
      const options = paramOptions(req);
      const data = await discoveryServiceInstance.getHome(req.currentUser as IUser,options)
      return res.json(data).status(200);
    }
    catch (e) {
      next(e)
    }
  });

};