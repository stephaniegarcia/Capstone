
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
 * @description function that returns average evaluation of all active organizations in the DB.
 * @return rating and organization name
 */
async function getAverageEvaluations(){
    try {
        const res = await pool.query(
          `SELECT ROUND(AVG(R.rating)) as rating, O.name
          FROM organization_rating as R INNER JOIN organization as O ON O.org_id = R.organization_id
          WHERE O.is_active = 'true'
          GROUP BY O.name`
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
 * @description function that returns top ten ranking organizations by business type. Top rating of all active organizations in the DB.
 * @param btID
 * @return organization name, business type id, rating
 */
async function getTopTenBT(btID){
    try {
        const res = await pool.query(
          `SELECT o.name, t.bt_id, ROUND(AVG(rating)) as rating
          FROM organization_rating as r inner join organization_business_type as t
          on r.organization_id = t.org_id
          inner join organization as o 
          on o.org_id = t.org_id
          where t.bt_id =$1 and o.is_active ='true'
          GROUP BY o.name, t.bt_id
          order by rating desc limit 10
        `, [btID]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
 * @description function that returns top ten ranking organizations by business stage. Top 10 rating of all active organizations in the DB.
 * @param bstage_id 
 * @return organization name, organization description, rating
 */
async function getTopTenBS(bstage_id){
    try {
        const res = await pool.query(
          `with average_rating as (
            SELECT organization_id as Organization_ID, ROUND(AVG(rating)) as Rating
            FROM organization_rating
            GROUP BY organization_id
            order by rating desc
        ),
        ordered_data as (
          select o.name, s.description, rating, row_number() over (partition by b.bstage_id) rank
          from average_rating r
            join organization o on o.org_id = r.organization_id
			join business_step b on o.bs_id = b.bs_id
			join business_stage s on b.bstage_id = s.bstage_id
            where b.bstage_id=$1 and o.is_active ='true'
          order by s.description, rating desc
        )
        select  name, description, rating
        from ordered_data
        where rank <= 10
        `, [bstage_id]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
 * @description function that returns evaluation of all active organizations in the DB with low ratings.
 * @return organization name, rating
 */
async function getOrgPerformingPoorly(){
    try {
        const res = await pool.query(
        `SELECT O.name, ROUND(AVG(rating)) as Rating
        FROM organization_rating as R INNER JOIN Organization as O on O.org_id = R.organization_id
		    where O.is_active = 'true'
        GROUP BY O.name
        order by rating asc
        Limit 10
        `,
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
 * @description function that returns accounts created divided by weeks.
 * @return number of the month, number of the week in the month
 */
async function getAccountsPerWeek(){
    try {
        const res = await pool.query(
        `SELECT
        date_part('month', date::date) as month,
        TO_CHAR( date, 'W' )::integer as week,
        COUNT(signup_id)
        FROM signup_log
        Group by month, week
        Order by month, week
        `,
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
 * @description function that returns comments for all active organizations in the system. Mostly used for troubleshooting
 * @return Organization, comment
 */
async function getComments(){
    try {
        const res = await pool.query(
        `SELECT O.name as Organization, R.rating_comment as Comment
        FROM public.organization_rating as R INNER JOIN public.organization as O
        ON O.org_id = R.organization_id
		    Where o.is_active = 'true'
        `,
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
 * @description function that returns the count for the organizations that have been contacted by users.
 * @return organization name, count
 */
async function getContactedCount(){
    try {
        const res = await pool.query(
        `SELECT
        O.name, COUNT(R.rating) as count
        FROM
            organization_rating as R INNER JOIN organization as O ON O.org_id = R.organization_id
            where O.is_active = 'true'
        group by
            O.name
        Order by count DESC
        `,
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

/**
 *@description function that inserts rating into the system
 * @param rating  rating must be from 1 to 5
 * @param user_id user who is rating
 * @param organization_id the organization being rated
 * @param rating_comment comment for the rating (optional)
 * @returns successful if no error is found, error if a parameter is missing or if a rating is duplicate (same user_id and org_id)
 */
const createRating =  (rating, user_id, organization_id, rating_comment) => {
    pool.query('INSERT INTO public.organization_rating(rating, user_id, organization_id, rating_comment) VALUES ($1, $2, $3, $4)', 
    [rating, user_id, organization_id, rating_comment],
    (error, results) => {
        if (error) {
            throw error
        }
        else{
            return results.rows;
        }
    })
}

/**
 * @description function that gathers all the ratings made by user with id userID
 * @param userID
 * @return name, org_id, user_id, rating, rating_comment if user is found, otherwise returns null
 */
async function getRatingsPerUser(userID){
  try {
      const res = await pool.query(
        `Select O.name, O.org_id, R.user_id, R.rating, R.rating_comment
        From organization as O left outer Join organization_rating as R on O.org_id = R.organization_id
        where R.user_id =$1 and o.is_active = 'true'`, [userID]
      );
      console.log(res.rows)
      return res.rows;
    } catch (err) {
      return err.stack;
    }
}

//functions used for this DAO
module.exports = {
    getAverageEvaluations,
    getTopTenBT,
    getTopTenBS,
    getOrgPerformingPoorly,
    getAccountsPerWeek,
    getComments,
    getContactedCount,
    createRating,
    getRatingsPerUser
}