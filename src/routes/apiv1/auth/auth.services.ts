import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";

import { singupAuthModel, singinAuthModel } from '../../../common/model/auth.model';
import { jwt_sign } from '../../../common/lib/jwt';


export async function singup(req:Request, res:Response, _next:NextFunction){
    try {
        const { name, password, email } = req.body;

        const passwordHash = await bcrypt.hash(password, 10)

        const result = await singupAuthModel(name, passwordHash, email)

        const jwt = jwt_sign({name,email})
        return res.json({result, jwt})

    } catch (error:any) {
        // Error de entrada duplicada
        if (error.code === 'ER_DUP_ENTRY')  return res.status(400).json({ message: 'the name or email already exist' });

        return res.status(500).json({message:"something goes wrong", })
    }
}

export async function singin(req:Request, res:Response, _next:NextFunction){
    try {
        const { name, email, password } = req.body;

        const {id, name1, email1, password1} = await singinAuthModel(name, email)

        const compare = await bcrypt.compare(password, password1).then(function(result) {
            result = true
            return result
        });

        console.log(compare)
        
        if ( !!await (bcrypt.compare(password, password1))) return res.status(500).json({message:"something goes wrong", })

        const jwt = jwt_sign({id,name1,email1})
        return res.json({jwt})

    } catch (error:any) {
        console.log({error})
        if (error.code === 'ER_DUP_ENTRY')  return res.status(400).json({ message: 'the name or email already exist' });

        return res.status(500).json({message:"something goes wrong", })
    }
}

export async function put_auth(_req:Request, res:Response, _next:NextFunction){
    try {
        
    } catch (error) {
        res.status(500).json({message:"something goes wrong"})
    }
}

export async function deleted_auth(_req:Request, res:Response, _next:NextFunction){
    try {
        
    } catch (error) {
        res.status(500).json({message:"something goes wrong"})
    }
}