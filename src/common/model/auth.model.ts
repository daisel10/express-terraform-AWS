import pool from "./bd.model";

export async function singinAuthModel() {


}
export async function singupAuthModel(name:string, password:string, email:string) {
    return await pool.query(`INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${password}');`);

}
export async function putAuthModel() {

}
export async function deletedAuthModel() {

}