
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
          `SELECT description FROM public.questions
          ORDER BY question_id ASC;`
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
            where T.bt_id = $1 AND S.bs_id= $2 AND O.is_active = 'true'
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
          `select O.org_id, O.name, O.description, O.email, O.phone_number, O.bt_id, O.bs_id, B.bstage_id, O.org_link, O.is_active
          FROM public.organization as O INNER JOIN public.business_step as B ON O.bs_id = B.bs_id
          where O.bt_id = $1 and is_active = true;`, [type]
        );
        console.log(res.rows)
        return res.rows;
      } catch (err) {
        return err;
      }
}


const saveAnswers = async (user_id,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) => {
  try {
    const res = await pool.query(
      `INSERT INTO public.answers(
        user_id, answers_1, answers_2, answers_3, answers_4, answers_5, answers_6, answers_7, answers_8, answers_9, answers_10, answers_11)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`, [user_id, a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11]
    );
    console.log(res.rows)
    return res.rows;
  } catch (err) {
    return err;
  }
}

const getOrganizationsReferredVersusContacted = async () => {
  try {
      const res = await pool.query(
        `SELECT O.name, 
        COUNT(*) FILTER (WHERE r.organization_id IS NULL) as Not_Contacted_Total,
        AVG((r.organization_id IS NOT NULL)::int) as percentage
        FROM users u
        CROSS JOIN organization o
        LEFT JOIN organization_rating r ON u.user_id = r.user_id AND o.org_id = r.organization_id
        Where O.is_active = true AND u.is_active=true
        GROUP BY o.name`,
      );
      console.log(res.rows)
      return res.rows;
    } catch (err) {
      return err;
    }
}

const changeAnswers = async (user_id,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) => {
  try {
    const res = await pool.query(
      `UPDATE public.answers
      SET user_id=$1, answers_1=$2, answers_2=$3, answers_3=$4, answers_4=$5, answers_5=$6, answers_6=$7, answers_7=$8, answers_8=$9, answers_9=$10, answers_10=$11, answers_11=$12
      WHERE user_id=$1;`, [user_id, a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11]
    );
    console.log(res.rows)
    return res.rows;
  } catch (err) {
    return err;
  }
}

const setType = async (user_id, type) => {
  try {
    const res = await pool.query(
      `UPDATE public.users
      SET bt_id=$2
      WHERE user_id=$1;`, [user_id, type]
    );
    console.log(res.rows)
    return res.rows;
  } catch (err) {
    return err;
  }
};


const organizationsByUser = async (user_id) => {
  try {
    const res = await pool.query(
      `SELECT R.rating, R.user_id, R.organization_id, R.rating_comment, O.name
      FROM public.organization_rating as R inner join organization as O ON R.organization_id = O.org_id
      where user_id =$1 AND o.is_active`, [user_id]
    );
    console.log(res.rows)
    return res.rows;
  } catch (err) {
    return err;
  }


}

async function getRoadMap(bstageID, btID){
  try {
      const res = await pool.query(
        `SELECT O.org_id, O.name, O.description, O.email, O.phone_number, O.bs_id, O.is_active, O.org_link, T.bt_id, b.bstage_id
        FROM public.organization as O inner join business_step as B on O.bs_id = b.bs_id
        inner join organization_business_type as t on o.org_id = t.org_id
        where b.bstage_id = 1 AND T.bt_id =1 AND O.is_active = 'true'
        ORDER BY bs_id ASC`, [bstageID, btID]
      );
      console.log(res.rows)
      return res.rows;
    } catch (err) {
      return err.stack;
    }
}

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

module.exports = {
    getQuestions,
    getOrganizationsFiltered,
    getOrganizationsByType,
    saveAnswers,
    changeAnswers,
    setType,
    getOrganizationsReferredVersusContacted,
    getRoadMap,
    organizationsByUser,
    getOrganizationsTypes
}