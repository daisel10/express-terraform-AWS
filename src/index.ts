import express from 'express'

import auth from './routes/apiv1/auth/auth.controler'

import pool from './common/model/bd.model'

const app = express()

app.use(express.json())


app.get('/ping', async (_req, res, _next)=>{
    const result = await pool.query("SELECT 1+1 AS result")
   res.json({result})
})

app.use('/apiv1', auth)




export default app;