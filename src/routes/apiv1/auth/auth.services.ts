import { Request, Response, NextFunction } from 'express';
import { singupAuthModel } from '../../../common/model/auth.model';

export async function singup_auth(req:Request, res:Response, _next:NextFunction){
    try {
        const { name, password, email } = req.body;

        const result = await singupAuthModel(name, password, email)
        
        return res.json({result})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"something goes wrong"})
    }
}

export async function singin_auth(_req:Request, res:Response, _next:NextFunction){
    try {
        
    } catch (error) {
        res.status(500).json({message:"something goes wrong"})
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