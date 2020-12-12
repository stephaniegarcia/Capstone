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
 * @description function that returns information of stages on DB. Used mainly for testing purposes.
 * @return all the information from business_stage table.
 */
async function getStages(){
    try {
        const res = await pool.query(
          `SELECT * FROM public.business_stage
          ORDER BY bstage_id ASC`
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

//Function used for this DAO
module.exports = {
    getStages
}