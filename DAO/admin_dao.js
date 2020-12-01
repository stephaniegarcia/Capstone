
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
            'SELECT A.admin_id, U.first_name from admin as A inner join users as U ON A.user_id = U.user_id WHERE admin_id = $1', [id]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}


const loginAdmin = async (email, password) => {
  try{

    const res = await pool.query(
        `select password = $1 as Match, admin_id from admin where email = $2;`, [password, email]
    );
    console.log(res.rows)
    return res.rows;

}catch(err){
    return err;
}
}

const getPassword = async (email) => {
    try{

        const res = await pool.query(
            `select password, admin_id from admin_test where email = $1;`, [email]
        );
        return res.rows;

    }catch(err){
        return err;
    }

}

const insertPasswordToken = async (email, token) => {
  try{

      const res = await pool.query(
          `update admin_test set reset_token = $2 where email = $1;`, [email, token]
      );
      return res.rows;

  }catch(err){
      return err;
  }

}

const getPasswordToken = async (email) => {
  try{

      const res = await pool.query(
          `select reset_token from admin_test where email = $1`, [email]
      );
      return res.rows;

  }catch(err){
      return err;
  }


}
const changePassword = async (email, password) => {

  try{
      const res = await pool.query(
          `update admin_test set password = $1 where email = $2;`, [password, email]
      );
      
      return res.rows;

  }catch(err){
      return err;
  }

}


module.exports = {
    getAdmins,
    getAdminByID,
    loginAdmin,
    insertPasswordToken,
    getPasswordToken,
    changePassword,
    getPassword
}