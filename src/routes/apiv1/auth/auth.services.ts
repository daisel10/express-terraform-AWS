import { Request, Response, NextFunction } from 'express';

import { singupAuthModel, singinAuthModel, putAuthModel, deletedAuthModel } from '../../../common/model/auth.model';
import { jwt_sign } from '../../../common/lib/jwt';
import { comparePassword, hashPassword } from '../../../common/lib/bcrypt';


export async function singup(req:Request, res:Response, _next:NextFunction){
    try {
        const { name, password, email } = req.body;

        const passwordHas = await hashPassword(password)

        const result = await singupAuthModel(name, passwordHas, email)

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

        const request = await singinAuthModel(name, email)
        
        
        const compare = await comparePassword(password, request.password)
        if (compare) return res.status(400).json({message:"the name, email or password is bad", })


        const data_jwt= {id: request.id, name: request.name, email:request.email}

        const jwt = jwt_sign(data_jwt)

        return res.json({jwt})

    } catch (error:any) {
        console.log({error})
        if (error.code === 'ER_DUP_ENTRY')  return res.status(400).json({ message: 'the name or email already exist' });

        return res.status(500).json({message:"something goes wrong", })
    }
}

export async function put_auth(req:Request, res:Response, _next:NextFunction){
    try {
        const { name, email, password } = req.body;
        const passwordHash = await hashPassword(password)

        const result = await putAuthModel(name, passwordHash, email)

        const jwt = jwt_sign({name,email})
        return res.json({result, jwt})
        
    } catch (error) {
        return res.status(500).json({message:"something goes wrong"})
    }
}

export async function deleted_auth(req:Request, res:Response, _next:NextFunction){
    try {
        const { name, email, password } = req.body;

        const request = await singinAuthModel(name, email)

        const compare = await comparePassword(password, request.password)
        if (compare) return res.status(400).json({message:"the name, email or password is bad", })

        await deletedAuthModel(name, email)

        return res.status(200).json({message:"the user was deleted"})

    } catch (error) {
        return res.status(500).json({message:"something goes wrong"})
    }
}