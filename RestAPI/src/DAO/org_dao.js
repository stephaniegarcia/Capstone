
//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})

async function getOrganizations(){
    try {
        const res = await pool.query(
          `SELECT *
          FROM public.organization
          where is_active = true;`
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

async function getOrganizationByID(id){
    try {
        const res = await pool.query(
            'SELECT * FROM organization WHERE org_id = $1', [id]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

const createOrg =  (name, description, email, phone_number, bt_id, bs_id, is_active, org_link) => {
    pool.query('INSERT INTO public.users(name, description, email, phone_number, bt_id, bs_id, is_active, org_link) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [name, description, email, phone_number, bt_id, bs_id, is_active, org_link], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
}

const updateOrganization = (org_id, name, description, email, phone, bt_id, bs_id, is_active, org_link) => {
    pool.query(
        'UPDATE public.organization	SET org_id =$1, name =$2, description=$3, email =$4, phone_number =$5, bt_id=$6, bs_id=$7, is_active =$8, is_verified=$9 WHERE org_id =$1',
        [org_id, name, description, email, phone, bt_id, bs_id, is_active, org_link],
        (error, results) => {
        if (error)
            throw error
        else
            return results.rows;
        }
    )
}

const inactivateOrganization = (org_id, is_active) => {
    pool.query(
        'UPDATE public.organization	SET org_id =$1, is_active =$2, WHERE org_id =$1',
        [org_id, is_active],
        (error, results) => {
        if (error)
            throw error
        else
            return results.rows;
        }
    )
}

module.exports = {
    getOrganizations,
    getOrganizationByID,
    createOrg,
    updateOrganization,
    inactivateOrganization
}