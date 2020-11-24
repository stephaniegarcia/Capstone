
//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432,
})


const createUser =  (first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified) => {


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

const updateUser = (id, first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified) => {
    
    pool.query(
        'UPDATE public.organization	SET org_id =$1, first_name =$2, last_name=$3, email =$4, user_password =$5, phone_number =$6, bt_id=$7, bs_id=$8, is_active =$8, is_verified=$9 WHERE org_id =$1',
        [id, first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified],
        (error, results) => {
        if (error) 
            throw error
        else
            return results.rows;
        }
    )
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) 
            throw error
        else
            return results.rows;    
 
    })
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

const deleteUser = async (email) => {
    
    
    pool.query('DELETE FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results
        }
    })
}


module.exports = {
    createUser, 
    getUsers,
    getUserById, 
    updateUser,
    verify,
    deleteUser
}