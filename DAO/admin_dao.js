
//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})

/**
 * @description function that verifies if admin exists in Database
 * @param email
 * @returns 1 if admin exists, 0 if admin does not exist in DB.
 */
const adminExists = async (email) => {
    try{

        const res = await pool.query(
            `SELECT CASE WHEN EXISTS (
                SELECT *
                FROM admin_test
                WHERE email = $1
            )
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) END`, [email]
        );
        return res.rows;

    }catch(err){
        return err;
    }
}


/**
 * @description function used for troubleshooting purposes. This function searches for admin with the parameter provided.
 * @param id
 * @return information from admin that has ID equals to the parameter given, else, it returns null.
 */
async function getAdminByID(id){
    try {
        const res = await pool.query(
            'SELECT A.admin_id, U.first_name from admin_test as A inner join users as U ON A.user_id = U.user_id WHERE admin_id = $1', [id]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
 * @description function used for troubleshooting purposes. Might be used in the future. Functions searches for admin in DB.
 * @param  email
 * @param  password
 * @return password as Match, and admin_id if admin is found in database.
 */
const loginAdmin = async (email, password) => {
  try{

    const res = await pool.query(
        `select password = $1 as Match, admin_id from admin_test where email = $2;`, [password, email]
    );
    console.log(res.rows)
    return res.rows;

}catch(err){
    return err;
}
}

/**
 * @description function that returns password of email, and admin id.
 * @param email
 * @return password and admin_id, if found in the database.
 */
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

/**
 * @description function that inserts password token into admin, used to validate account.
 * @param email
 * @param token
 * @return error if update was not possible, else returns query was successful. 
 */
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

/**
 * @description function that gets password token from admin, used to validate account.
 * @param email
 * @return reset token used to reset password, else returns null. 
 */
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

/**
 * @description function that updates password from admin.
 * @param email
 * @param password
 * @return error if update was not possible, else returns query was successful. 
 */
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

//Functions used for this DAO
module.exports = {
    getAdminByID,
    loginAdmin,
    insertPasswordToken,
    getPasswordToken,
    changePassword,
    getPassword,
    adminExists
}