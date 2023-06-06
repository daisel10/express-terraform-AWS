import { Router } from "express";
import { singin, singup, put_auth, deleted_auth } from "./auth.services";
import { jwt_authentification } from "../../../common/middleware/jwt_authentication";

const router = Router();

router.get('/auth',(_req, res)=>{
    res.send('pong');
});
router.put('/auth', jwt_authentification, put_auth);
router.delete('/auth', deleted_auth);
router.post('/auth/singup', singup);

router.post('/auth/singin', singin);

export default router