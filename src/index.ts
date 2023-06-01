import express from 'express'

import auth from './routes/auth/auth.controler'

const app = express()

app.use(express.json())


app.get('/ping',(_req, res)=>{
    console.log('someone pinged here!!');
    res.send('pong');
})

app.use('/api', auth)




export default app;