const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users/insert', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.get('/admins', db.getAdmins)
app.get('/admins/:id', db.getAdminById)
app.post('/admins/insert', db.insertAdmin)
app.delete('/admins/:id', db.deleteAdmin)
app.get('/organizations', db.getOrganizations)
app.post('/organizations/insert', db.createOrganization)
app.put('/organizations/:id', db.updateOrganization)
app.get('/ratings', db.getOrgRatings)
app.post('/ratings/insert', db.createOrgRating)
app.get('/topBT/:id', db.getTopOrganizationsPerBT)
app.get('/topBS/:bt_id/businessstage/:bs_id', db.getTopOrganizationsPerBS)
app.get('/accountspw', db.getAccountsCreatedPerWeek)
app.get('/ratingcount', db.getOrgRatingsCount)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})