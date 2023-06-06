import { Router } from "express";
import { singin, singup, put_auth, deleted_auth } from "./auth.services";

const router = Router();

router.get('/auth',(_req, res)=>{
    res.send('pong');
});
router.put('/auth/:id',put_auth);
router.delete('/auth/:id',deleted_auth);
router.post('/auth/singup',singup);

router.post('/auth/singin',singin);

export default router