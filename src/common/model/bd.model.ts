import { createPool } from "mysql2/promise";

import configEnv from "../../config";

const pool = createPool({
    host: configEnv.mysql.host,
    user: configEnv.mysql.user,
    password:configEnv.mysql.password ,
    port: configEnv.mysql.port as number,
    database: configEnv.mysql.database
})


export default pool