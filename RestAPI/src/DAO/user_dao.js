
//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})



const createUser =  async (first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified, token) => {

    pool.query('INSERT INTO public.users(first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified, verify_token) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified, token], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
}



const verify =  async (email) => {
    try {

        const res = await pool.query(
            `UPDATE public.users SET is_verified = true where email = $1`,
            [email]
        );
        console.log(res.rows)
        return res;
      } catch (err) {
        return err;
      }

}

const updateUser = async (id, first_name, last_name, business_status, phone_number, business_stage) => {
    
        try {
            const res = await pool.query(
                `UPDATE public.users SET first_name=$1, last_name=$2, business_status=$3, phone_number=$4, bs_id=$5 WHERE user_id=$6;`,
                [first_name, last_name, business_status, phone_number,business_stage, id]
            );
            console.log(res.rows)
            return res;
          } catch (err) {
            return err;
          }
    
}

const getUserById = async (id) => {
    try {
        const res = await pool.query(
            'SELECT * FROM users WHERE user_id = $1', [id]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err;
      }

}

async function getUsers(){
    try {
        const res = await pool.query(
          `SELECT * FROM users ORDER BY user_id ASC`
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
    
}



const login = async (email, password) =>{

    try{

        const res = await pool.query(
            `select user_password = $1 as Match, user_id from users where email = $2;`, [password, email]
        );
        return res.rows;

    }catch(err){
        return err;
    }

};

const changePassword = async (email, password) => {

    try{

        const res = await pool.query(
            `update public.users set user_password = $1 where email = $2;`, [password, email]
        );
        return res.rows;

    }catch(err){
        return err;
    }

}

const getToken = async (email) => {
    try{

        const res = await pool.query(
            `select verify_token from public.users where email = $1`, [email]
        );
        return res.rows;

    }catch(err){
        return err;
    }

}

const getPasswordToken = async (email) => {
    try{

        const res = await pool.query(
            `select reset_password_token from public.users where email = $1`, [email]
        );
        return res.rows;

    }catch(err){
        return err;
    }

}
const insertPasswordToken = async (email, token) => {
    try{

        const res = await pool.query(
            `update users set reset_password_token = $2 where email = $1;`, [email, token]
        );
        return res.rows;

    }catch(err){
        return err;
    }

}

const log = async (id) => {
    try{

        const res = await pool.query(
            `insert into login_log(login_date, user_id) values (TIMESTAMP, $1);`, [id]
        );
        return res.rows;

    }catch(err){
        return err;
    }

}



module.exports = {
    createUser, 
    getUsers,
    getUserById, 
    updateUser,
    verify,
    login,
    changePassword,
    getToken,
    insertPasswordToken,
    getPasswordToken,
    log
}