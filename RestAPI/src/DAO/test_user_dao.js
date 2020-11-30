
//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})



const createTestUser =  async (name, email, password, phone) => {
    pool.query(`INSERT INTO public.user_test(
        name, email, password, phone)
        VALUES ($1, $2, $3, $4);`, [name, email, password, phone], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
}

async function getTestUsers(){
    try {
        const res = await pool.query(
          `SELECT * FROM public.user_test
          ORDER BY user_id ASC`
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

const test_login = async (email, password) =>{
    try{
        const res = await pool.query(
            `select user_password = $1 as Match, user_id from users where email = $2;`, [password, email]
        );
        return res.rows;

    }catch(err){
        return err;
    }

};

async function getUserWithEmail(email){
    try {
        const res = await pool.query(
          `SELECT password
          FROM public.user_test
          where email = $1`, [email]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

module.exports = {
    createTestUser,
    getTestUsers,
    test_login,
    getUserWithEmail
}