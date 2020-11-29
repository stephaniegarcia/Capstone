//Authentication with Database
const Pool = require('pg').Pool
// Declare a new client instance from Pool()
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Capstone2',
    password: '6rrz9afwZ1994!',
    port: 5432,
})

//-----------------------------Queries for table: Users------------------------------------------------//
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified } = request.body

    pool.query('INSERT INTO public.users(first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified } = request.body

    pool.query(
        'UPDATE public.organization	SET org_id =$1, first_name =$2, last_name=$3, email =$4, user_password =$5, phone_number =$6, bt_id=$7, bs_id=$8, is_active =$8, is_verified=$9 WHERE org_id =$1',
        [id, first_name, last_name, email, user_password, business_status, phone_number, bt_id, bs_id, is_active, is_verified],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Organization modified with ID: ${id}`)
        }
    )
}


const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}


//-----------------------------Queries for table: Admin------------------------------------------------//

const getAdmins = (request, response) => {
    pool.query('SELECT A.admin_id as ID, U.first_name as name FROM admin as A INNER JOIN users as U ON A.user_id = U.user_id ORDER BY admin_id, first_name ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAdminById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM admin WHERE admin_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const insertAdmin = (request, response) => {
    const { user_id } = request.body

    pool.query('INSERT INTO admin (user_id) VALUES ($1)', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}

const deleteAdmin = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM admin WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

//-----------------------------Queries for table: Organizations------------------------------------------------//
const getOrganizations = (request, response) => {
    pool.query('SELECT * FROM organization ORDER BY org_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getOrgById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM organization WHERE org_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createOrganization = (request, response) => {
    const { name, description, email, phone_number, bt_id, bs_id, is_active } = request.body

    pool.query('INSERT INTO public.organization(name, description, email, phone_number, bt_id, bs_id, is_active) VALUES($1, $2, $3, $4, $5, $6, $7)', [name, description, email, phone_number, bt_id, bs_id, is_active], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Organization added successfully!`)
    })
}

const updateOrganization = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, description, email, phone_number, bt_id, bs_id, is_active } = request.body

    pool.query(
        'UPDATE public.organization	SET org_id =$1, name =$2, description =$3, email =$4, phone_number =$5, bt_id=$6, bs_id=$7, is_active =$8 WHERE org_id =$1',
        [id, name, description, email, phone_number, bt_id, bs_id, is_active],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Organization modified with ID: ${id}`)
        }
    )
}

//-----------------------------Queries for table: Organization rating------------------------------------------------//
const getOrgRatings = (request, response) => {
    pool.query('SELECT * FROM public.organization_rating ORDER BY user_id ASC, organization_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createOrgRating = (request, response) => {
    const { first_name, last_name, email, user_password, business_status, phone_number } = request.body
    pool.query('INSERT INTO organization_rating(rating, user_id, organization_id, rating_comment) VALUES($1, $2, $3, $4);', [first_name, last_name, email, user_password, business_status, phone_number], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Organization_rating added with ID: ${result.insertId}`)
    })
}

//-----------------------------Queries for table: Reports------------------------------------------------//

const getTopOrganizationsPerBT = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('with average_rating as (SELECT organization_id as Organization_ID, ROUND(AVG(rating)) as Rating	FROM organization_rating GROUP BY organization_id ), ordered_data as (select org_id, bt_id, rating, row_number() over(partition by bt_id order by rating desc) rank from average_rating r join organization o on o.org_id = r.organization_id where bt_id = $1 order by bt_id, rating desc ) select  org_id, bt_id, rating from ordered_data where rank <= 10 ', [id],
    (error, results) => {
        if (error) {
            throw error
        }
            response.status(200).json(results.rows)
    })
}

const getTopOrganizationsPerBS = function(request, response){
    const bt_id = parseInt(request.params.bt_id)
    const bs_id = parseInt(request.params.bs_id)
    pool.query(
        'with average_rating as (SELECT organization_id as Organization_ID, ROUND(AVG(rating)) as Rating FROM organization_rating GROUP BY organization_id order by rating desc), ordered_data as (select org_id, bt_id, rating, row_number() over(partition by bt_id) rank from average_rating r join organization o on o.org_id = r.organization_id where bt_id = $1 AND bs_id = $2 order by bt_id, rating desc ) select  org_id, bt_id, rating from ordered_data where rank <= 10', bt_id, bs_id,
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        }
    )
}

const getAccountsCreatedPerWeek = (request, response) => {
    const id = parseInt(request.params.id)
    const { first_name, last_name, email, user_password, business_status, phone_number } = request.body

    pool.query(
        //'SELECT date_part('year', date::date) as year, date_part('week', date:: date) AS week, COUNT(singup_id) FROM signup_log GROUP BY year, week ORDER BY year, week;',
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        }
    )
}

const getOrgRatingsCount = (request, response) => {
    pool.query('SELECT O.name, COUNT(R.rating) as count FROM organization_rating as R INNER JOIN organization as O ON O.org_id = R.organization_id group by O.name Order by count DESC',
        (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//Queries for table: Users
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAdmins,
    getAdminById,
    insertAdmin,
    deleteAdmin,
    getOrganizations,
    getOrgById,
    createOrganization,
    updateOrganization,
    getOrgRatings,
    createOrgRating,
    getTopOrganizationsPerBT,
    getTopOrganizationsPerBS,
    getAccountsCreatedPerWeek,
    getOrgRatingsCount
}