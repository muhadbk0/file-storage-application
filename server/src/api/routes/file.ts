import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import middlewares from '../../middlewares'
import FileService from '../../services/file'
import upload from '../../middlewares/mediaupload'
import { IUser , IFile} from '../../interfaces'
import paramOptions from '../../util/paramOptions'
const route = Router();
export default (app: Router) => {
  app.use('/files', route)
  route.get('/search/:text',  middlewares.isHaveAuth, middlewares.attachCurrentUser,async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileServiceInstance = Container.get(FileService)
      const options = paramOptions(req);
      const data = await fileServiceInstance.search(req.currentUser as IUser, req.params.text as string, options)
      return res.json(data).status(200);
    }
    catch (e) {
      return next(e);
    }
  });

  route.get('/list',  middlewares.isHaveAuth, middlewares.attachCurrentUser,async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileServiceInstance = Container.get(FileService)
      const options = paramOptions(req);
      const data = await fileServiceInstance.list(req.currentUser as IUser, options)
      return res.json(data).status(200);
    }
    catch (e) {
      return next(e);
    }
  });

  route.post('/create', middlewares.isAuth, middlewares.attachCurrentUser, upload.single("file"), async (req: Request, res: Response) => {
    const fileServiceInstance = Container.get(FileService)
    const data = await fileServiceInstance.fileUpload(req.currentUser as IUser, req.file.originalname)
    return res.json(data).status(200);
  });

   route.delete('/delete/:id' ,middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileServiceInstance = Container.get(FileService)
      const data = await fileServiceInstance.delete({  _id: req.params.id } as IFile, req.currentUser as IUser  )
      return res.json(data).status(200);
    }
    catch (e) {
      return next(e);
    }
  });
  route.put('/update/:id' ,middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileServiceInstance = Container.get(FileService)
      const data = await fileServiceInstance.update({  _id: req.params.id } as IFile, req.currentUser as IUser  )
      return res.json(data).status(200);
    }
    catch (e) {
      return next(e);
    }
  });
  };