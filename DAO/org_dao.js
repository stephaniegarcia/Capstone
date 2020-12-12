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
 * @description route that verifies if organization that is inactive exists in Database
 * @param email
 * @returns 1 if organizations exists, 0 if it does not exist in DB.
 */
const inactiveOrganizationExists = async (email) => {
  try{

      const res = await pool.query(
          `SELECT CASE WHEN EXISTS (
              SELECT *
              FROM organization
              WHERE email = $1 and is_active = 'false'
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
 * @description route that verifies if organization exists in Database
 * @param email
 * @returns 1 if organization exists, 0 if it does not exist in DB.
 */
const organizationExists = async (email) => {
  try{

      const res = await pool.query(
          `SELECT CASE WHEN EXISTS (
              SELECT *
              FROM organization
              WHERE email = $1 and is_active = 'true'
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
 * @description function that returns information of active organizations in the DB.
 * @returns org_id, name, description, email, phone_number, bstage_id, bt_id, bs_id, is_active, org_link.
 */
async function getOrganizations(){
    try {
        const res = await pool.query(
          `SELECT o.org_id, o.name, o.description, o.email, o.phone_number, B.bstage_id, t.bt_id, o.bs_id, o.is_active, o.org_link
          FROM public.organization as o inner join organization_business_type as t on o.org_id = t.org_id
          INNER JOIN public.business_step as B ON O.bs_id = B.bs_id
          where o.is_active = 'true'
          ORDER BY o.org_id ASC`
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
 * @description function that returns information of an individual organization in the DB.
 * @param id 
 * @returns org_id, name, description, email, phone_number, bstage_id, bt_id, bs_id, is_active, org_link.
 */
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

/**
 * @description function that returns the id of the organization selected by email.
 * @param email
 * @returns org_id if found, else null
 */
async function getOrganizationIDByEmail(email){
  try {
      const res = await pool.query(
          `SELECT org_id
          FROM public.organization 
          where email = $1`, [email]
      );
      return res.rows;
    } catch (err) {
      return err.stack;
    }
}

 /**
  * @description function that inserts organization.
  * @param name 
  * @param description 
  * @param email 
  * @param phone_number 
  * @param bs_id 
  * @param is_active 
  * @param org_link 
  * @returns successful if no error is found (parameters missing), else returns error
  */
const createOrg =  async (name, description, email, phone_number, bs_id, is_active, org_link) => {
    try {
        const res = await pool.query(`INSERT INTO public.organization(
            name, description, email, phone_number, bs_id, is_active, org_link)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            returning org_id`, [name, description, email, phone_number, bs_id, is_active, org_link]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
  * @description function that updates organization.
  * @param name 
  * @param description 
  * @param email 
  * @param phone_number 
  * @param bs_id 
  * @param is_active 
  * @param org_link 
  * @returns successful if no error is found (parameters missing), else returns error
  */
function updateOrganization(name, description, email, phone, bs_id, org_link, org_id) {
    pool.query(
        'UPDATE public.organization	SET name =$1, description=$2, email =$3, phone_number =$4, bs_id=$5, org_link=$6, is_active = true WHERE org_id =$7',
        [name, description, email, phone, bs_id, org_link, org_id],
        (error, results) => {
            if (error)
                throw error;

            else
                return results.rows;
        }
    );
}

/**
 * @description function that updates organization.
 * @param is_active 
 * @param org_id 
 * @return successful if no error is found, else returns error.
 */
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

/**
 * @description function that returns the organization's business type. Organization is searched in DB by id
 * @param orgID 
 * @return business types pertaining to the organization
 */
async function getOrganizationsTypes(orgID){
    try {
        const res = await pool.query(
          `select distinct t.bt_id, b.description
          from public.organization_business_type as t
          inner join organization as o on t.org_id = o.org_id
		      inner join business_type as b on b.bt_id = t.bt_id
          where o.org_id = $1
          Order by t.bt_id asc`, [orgID]
        );
        return res.rows;
      } catch (err) {
        return err.stack;
      }
  }

/**
 * @description function that returns the organization's missing business type. Organization is searched in DB by id. Mostly used for troubleshooting.
 * @param orgID 
 * @return missing business types pertaining to the organization
 */
async function getOrganizationsMissingTypes(orgID){
  try {
      const res = await pool.query(
        `select distinct t.bt_id, b.description
        from public.organization_business_type as t
		    inner join business_type as b on b.bt_id = t.bt_id
        where t.bt_id not in
        (select distinct t.bt_id
         from public.organization_business_type as t
         inner join organization as o on t.org_id = o.org_id
         where o.org_id = $1
        )
        Order by t.bt_id asc`, [orgID]
      );
      console.log(res.rows)
      return res.rows;
    } catch (err) {
      return err.stack;
    }
}

/**
 *@description function that inserts into an organization the business type with id bt_id
 * @param bt_id 
 * @param org_id 
 * @return successful if no error is found, else returns error (most likely parameters missing)
 */
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

/**
 * @description function that deletes an organization, with id org_id, business type with id bt_id
 * @param bt_id 
 * @param org_id 
 * @return successful if no error is found, else returns error (most likely parameters missing)
 */
const deletingOrgBusinessType = async (bt_id, org_id) => {
    try {
        const res = await pool.query(
            `DELETE FROM public.organization_business_type
            WHERE org_id = $1 and bt_id =$2;`, [org_id, bt_id]
        );
        return res;
      } catch (err) {
        return err.stack;
      }
}

//Functions used for this DAO
module.exports = {
    getOrganizations,
    getOrganizationByID,
    createOrg,
    updateOrganization,
    inactivateOrganization,
    getOrganizationsTypes,
    getOrganizationsMissingTypes,
    attachingOrgToBusinessType,
    deletingOrgBusinessType,
    organizationExists,
    inactiveOrganizationExists,
    getOrganizationIDByEmail
}