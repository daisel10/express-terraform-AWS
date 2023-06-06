# express-all

## EndPoint 
### /apiv1/auth/singup method: POST
resive en el body name, email, password
devuelve un token que expira en 2 dias }

### /apiv1/auth/singin method: POST
resive en el body name o email y password
devuelve un token que expira en 2 dias

### /apiv1/auth method: PUT
pasa por un middleware que auntentica el tocken y se puede pasar por body con token, query con token, headers con"x-access-token"
Actuliza la contraseña 
resive en el body name o email y password
devuelve un token que expira en 2 dias

### /apiv1/auth method: DELETE 
borra al usuario 
resive en el body name, email, password
devuelve un 200 si fue un exito
