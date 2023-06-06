import pool from "./bd.model";

export async function singinAuthModel( name:string, email:string) {
    return await pool.query(`SELECT * FROM user WHERE name = '${name}' OR email = '${email}';`).then((data:any)=>{
        return data[0][0]
   });
;

}
export async function singupAuthModel(name:string, password:string, email:string) {
    return await pool.query(`INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${password}');`)
}
export async function putAuthModel() {

}
export async function deletedAuthModel() {

}