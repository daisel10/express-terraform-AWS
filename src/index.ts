import express from 'express'

import auth from './routes/apiv1/auth/auth.controler'

const app = express()

app.use(express.json())


app.get('/ping',(_req, res, _next)=>{
    
    res.send('pong');
})

app.use('/apiv1', auth)




export default app;