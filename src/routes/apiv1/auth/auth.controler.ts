import { Router } from "express";

const router = Router();

router.get('/auth',(_req, res)=>{
    res.send('pong');
});

router.post('/auth/singup',(_req, res)=>{
    res.send('pong');
});

router.post('/auth/singin',(_req, res)=>{
    res.send('pong');
});

export default router