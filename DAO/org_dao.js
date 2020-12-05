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
          `SELECT o.org_id, o.name, o.description, o.email, o.phone_number, t.bt_id, o.bs_id, o.is_active, o.org_link
          FROM public.organization as o inner join organization_business_type as t on o.org_id = t.org_id
          where o.is_active = 'true'
          ORDER BY o.org_id ASC`
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
            `SELECT o.org_id, o.name, o.description, o.email, o.phone_number, t.bt_id, o.bs_id, o.is_active, o.org_link
            FROM public.organization as o inner join organization_business_type as t on o.org_id = t.org_id
            where o.is_active = 'true' and o.org_id = $1`, [id]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

//Deleted bt_id from function, added returning values
const createOrg =  (name, description, email, phone_number, bs_id, is_active, org_link) => {
    pool.query(`INSERT INTO public.organization(
        name, description, email, phone_number, bs_id, is_active, org_link)
        VALUES ('$1, $2, $3, $4, $5, $6, $7)
        returning org_id, name, description, email, phone_number, bs_id, is_active, org_link`, [name, description, email, phone_number, bs_id, is_active, org_link], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
}

//Deleted bt_id from function
const updateOrganization = (name, description, email, phone, bs_id, org_link, org_id) => {
    pool.query(
        'UPDATE public.organization	SET name =$1, description=$2, email =$3, phone_number =$4, bt_id=$5, org_link=$6 WHERE org_id =$7',
        [name, description, email, phone, bs_id, org_link, org_id],
        (error, results) => {
        if (error)
            throw error
        else
            return results.rows;
        }
    )
}

//To be updated -- Have to decide if inactive organization will be inactivating the complete organization, or just the type
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

async function getOrganizationsTypes(orgID){
    try {
        const res = await pool.query(
          `select distinct t.bt_id
          from public.organization_business_type as t
          inner join organization as o on t.org_id = o.org_id
          where o.org_id = $1`[orgID]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
  }

async function getOrganizationsMissingTypes(orgID){
  try {
      const res = await pool.query(
        `select distinct t.bt_id
        from public.organization_business_type as t
        where t.bt_id not in
        (select distinct t.bt_id
         from public.organization_business_type as t
         inner join organization as o on t.org_id = o.org_id
         where o.org_id = $1
        )`[orgID]
      );
      console.log(res.rows)
      return res.rows;
    } catch (err) {
      return err.stack;
    }
}

const attachingOrgToBusinessType =  (bt_id, org_id) => {
    pool.query(`INSERT INTO public.organization_business_type(
                bt_id, org_id)
                VALUES ($1, $2);`, [bt_id, org_id], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
}

const deletingOrgBusinessType =  (bt_id, org_id) => {
    pool.query(`DELETE FROM public.organization_business_type
	            WHERE org_id = $1 and bt_id =$2`, [bt_id, org_id], (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
}

module.exports = {
    getOrganizations,
    getOrganizationByID,
    createOrg,
    updateOrganization,
    inactivateOrganization,
    getOrganizationsTypes,
    getOrganizationsMissingTypes,
    attachingOrgToBusinessType,
    deletingOrgBusinessType
}