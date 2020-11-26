
//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})

async function getAdmins(){
    try {
        const res = await pool.query(
          `SELECT A.admin_id, U.first_name
          from admin as A inner join users as U ON A.user_id = U.user_id`
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

async function getAdminByID(id){
    try {
        const res = await pool.query(
            'SELECT * FROM admin WHERE admin_id = $1', [id]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

async function createAdmin (user_id) {

    try {
        const res = await pool.query(
            'INSERT INTO public.admin2(user_id) VALUES ($1);', [user_id]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

module.exports = {
    getAdmins,
    getAdminByID,
    createAdmin
}