import { Router } from "express";

const router = Router();

router.get('/auth',(_req, res)=>{
    console.log('someone pinged here!!');
    res.send('pong');
});

export default router