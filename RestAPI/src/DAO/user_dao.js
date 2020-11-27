
//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})



const createUser =  async (first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified) => {

    pool.query('INSERT INTO public.users(first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
}


const verify =  (is_verified) => {
    pool.query('UPDATE public.users SET is_verified = $1', [is_verified], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
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
            `update public.user set user_password = $1 where email = $2;`, [password, email]
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
    changePassword
}