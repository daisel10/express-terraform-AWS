

import { Request, Response, NextFunction } from 'express'

import { jwt_verification } from '../lib/jwt';


export function jwt_authentification(req:Request, res:Response, next:NextFunction){
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token || req.headers["x-access-token"];

    if (!jwtToken) {
      return res
      .status(403)
      .json({ error: "A token is required for authentication " });
      }
      try {
       const jsonCode = jwt_verification(jwtToken)
       req.body.user = jsonCode;
        
      } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
      }
      return next();
}

