
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
          `SELECT O.org_id, O.name, O.description, O.email, O.phone_number, O.bt_id as Type, O.bs_id as Step, B.bstage_id as Stage, O.org_link
          FROM public.organization as O INNER JOIN public.business_step as B ON O.bs_id = B.bs_id
          where is_active = true
          ORDER BY org_id ASC`
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
            `SELECT O.org_id, O.name, O.description, O.email, O.phone_number, O.bt_id as Type, O.bs_id as Step, B.bstage_id as Stage, O.org_link 
            FROM public.organization as O INNER JOIN public.business_step as B ON O.bs_id = B.bs_id
            where is_active = true AND org_id = $1
            ORDER BY org_id ASC`, [id]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

const createOrg =  (name, description, email, phone_number, bt_id, bs_id, is_active, org_link) => {
    pool.query('INSERT INTO public.organization(name, description, email, phone_number, bt_id, bs_id, is_active, org_link) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [name, description, email, phone_number, bt_id, bs_id, is_active, org_link], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
}

const updateOrganization = (name, description, email, phone, bt_id, bs_id, org_link, org_id) => {
    pool.query(
        'UPDATE public.organization	SET name =$1, description=$2, email =$3, phone_number =$4, bt_id=$5, bs_id=$6, org_link=$7 WHERE org_id =$8',
        [name, description, email, phone, bt_id, bs_id, org_link, org_id],
        (error, results) => {
        if (error)
            throw error
        else
            return results.rows;
        }
    )
}

const inactivateOrganization = (is_active, org_id) => {
    pool.query(
        'UPDATE public.organization	SET is_active=$1 WHERE org_id =$2',
        [is_active,org_id],
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