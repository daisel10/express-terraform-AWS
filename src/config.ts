import { config } from "dotenv";

config();


const configEnv = {
    api :{
        port: process.env.API_PORT || 3000,
        jwt: process.env.JWT_SECRET || 'dfghjkoiuytrvbjuytfvb2345678uhfder'
    },
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user:  process.env.DB_USER || 'root',
        password:  process.env.DB_PASSWORD || 'admit',
        database: process.env.DB_DATABASE || 'users'
    }
}

export default configEnv;