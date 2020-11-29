
//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})

async function getAverageEvaluations(){
    try {
        const res = await pool.query(
          `SELECT ROUND(AVG(R.rating)) as rating, O.name
          FROM organization_rating as R INNER JOIN organization as O ON O.org_id = R.organization_id
          GROUP BY O.name;`
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

async function getTopTenBT(btID){
    try {
        const res = await pool.query(
          `with average_rating as (
            SELECT organization_id as Organization_ID, ROUND(AVG(rating)) as Rating
          FROM organization_rating
          GROUP BY organization_id
        ),
        ordered_data as (
          select O.name, bt_id, rating, row_number() over (partition by bt_id order by rating desc) rank
          from average_rating r
            join organization o on o.org_id = r.organization_id
          where bt_id = $1
          order by O.name, rating desc 
        )
        select  name, bt_id, rating
        from ordered_data
        where rank <= 10
        `, [btID]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

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
            where b.bstage_id=$1
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

async function getOrgPerformingPoorly(){
    try {
        const res = await pool.query(
        `SELECT O.name, ROUND(AVG(rating)) as Rating
        FROM organization_rating as R INNER JOIN Organization as O on O.org_id = R.organization_id
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

async function getAccountsPerWeek(){
    try {
        const res = await pool.query(
        `SELECT date_part('year', date::date) as year,
        date_part('week', date::date) AS week,
        COUNT(signup_id)
        FROM signup_log
        GROUP BY year, week
        ORDER BY year, week;
        `,
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

async function getComments(){
    try {
        const res = await pool.query(
        `SELECT O.name as Organization, R.rating_comment as Comment
        FROM public.organization_rating as R INNER JOIN public.organization as O
        ON O.org_id = R.organization_id
        `,
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err.stack;
      }
}

async function getContactedCount(){
    try {
        const res = await pool.query(
        `SELECT
            O.name, COUNT(R.rating) as count
        FROM
            organization_rating as R INNER JOIN organization as O ON O.org_id = R.organization_id
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

module.exports = {
    getAverageEvaluations,
    getTopTenBT,
    getTopTenBS,
    getOrgPerformingPoorly,
    getAccountsPerWeek,
    getComments,
    getContactedCount,
    createRating
}