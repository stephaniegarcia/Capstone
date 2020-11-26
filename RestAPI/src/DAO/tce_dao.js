
//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432,
})


const getQuestions = async () => {
    try {
        const res = await pool.query(
          `SELECT * FROM questions;`
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err;
      }

};

//aun falta definir bien como se va a filtrar
const getOrganizationsFiltered = async (stage, type) => {
    try {
        const res = await pool.query(
          `select O.name as Org_name, T.description as Org_Type, S.description as Org_stage
          from organization as O inner join business_type 
          as T on O.bt_id = T.bt_id
          inner join business_step as S on O.bs_id = S.bs_id
            where T.bt_id = $1 AND S.bs_id= $2
          order by O.bt_id desc`, [type, stage]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err;
      }

};

const getOrganizationsByType = async (type) => {
    try {
        const res = await pool.query(
          `select * from organization where bt_id = $1 and is_active = true;`, [type]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err;
      }
}


module.exports = {
    getQuestions,
    getOrganizationsFiltered,
    getOrganizationsByType
}