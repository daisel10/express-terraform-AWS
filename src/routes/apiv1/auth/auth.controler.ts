import { Router } from "express";
import { singin_auth, singup_auth, put_auth, deleted_auth } from "./auth.services";

const router = Router();

router.get('/auth',(_req, res)=>{
    res.send('pong');
});
router.put('/auth/:id',put_auth);
router.delete('/auth/:id',deleted_auth);
router.post('/auth/singup',singup_auth);

router.post('/auth/singin',singin_auth);

export default router