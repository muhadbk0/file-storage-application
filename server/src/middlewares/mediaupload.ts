import multer from 'multer'
import path from 'path'
import mime from 'mime-types';
import { IFile } from '../interfaces';

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      console.log("__dirname: ",path.join(__dirname,'..','..','/public/file-uploads'))
      cb(null, path.join(__dirname,'..','..','/public/file-uploads'))
    },
    filename:  (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log("currentUser: ",req.currentUser)
      console.log("file: ", file)
      const file_path= req.currentUser._id+'-' + uniqueSuffix+'-'+file.originalname;
       const fileOut:IFile = {
        name:file.originalname,
        extention : mime.extension(file.mimetype),
        file_path,
       } as IFile;
       req.body = {...req.body, ...fileOut }
      cb(null,file_path)
    }
  })
  
const upload =  multer({ storage: storage })

export default upload;