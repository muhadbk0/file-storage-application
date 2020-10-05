import {Request,Response,NextFunction} from 'express'

const isAdmin = (req:Request,res:Response,next:NextFunction )=>{
 if( req.currentUser.role !=='admin' ){
    const error = new Error('You not an admin user');
    error["status"]=404;
    throw error
 }
 next()
};

export default isAdmin;