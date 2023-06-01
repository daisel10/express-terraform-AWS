
import jwt  from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import configEnv from '../config';


export function jwt_authentification(req:Request, _res:Response, next:NextFunction){
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token;

    if (!jwtToken) {
        const error = new Error('no token provided');
        error.stack = '401';
        next(error);
        return;
      }

      jwt.verify(jwtToken, configEnv.api.jwt , (err:any) =>  {
        if (err) {
          const error = new Error('invalid token');
          error.stack = '401';
          next(error);
        }
    
        
        next();
    
      });
}


