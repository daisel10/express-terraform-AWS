import jwt  from 'jsonwebtoken'
import configEnv from '../../config'

export function jwt_verification(jwtToken:any){
    return jwt.verify(jwtToken, configEnv.api.jwt)
}

export function jwt_sign(data:any){
        return jwt.sign(data, configEnv.api.jwt, {expiresIn: '2d'})    

}