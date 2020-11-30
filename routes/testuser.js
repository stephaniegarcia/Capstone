
const { Router } = require('express');
var nodemailer  = require('nodemailer');
const randomstring = require('randomstring');
const dao  = require('../DAO/test_user_dao');
const bcrypt = require('bcrypt')
const saltRounds = 10;

//Authentication with Database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})

const router = Router();

router.post('/api/testuser', (req, res) => {
    const {name, email, password, phone} = req.body;
    const hashedPassword = bcrypt.hashSync(password,saltRounds)
    if(name && email && password && phone){
            dao.createTestUser(name, email, hashedPassword, phone)
            res.status(200).send("User registered with encrypted password!");
    }
    else{
        res.status(404).send("Error: Some parameters are missing")
    }
});

router.get('/api/testuser', async (req,res) => {
    const organization = await dao.getTestUsers()
    console.log(organization)
    res.send(organization)
});

router.post('/api/testlogin', async (req,res) => {

    const {email, password} = req.body;
    if (!(email && password)) {
        return next(new Error('Missing email or password'))
    }
    const hashedPassword = await dao.getUserWithEmail(email)
    const isMatchingPassword = bcrypt.compareSync(password, hashedPassword[0].password)

    if (!isMatchingPassword) {
        res.status(404).send("Authentication Failed!")
    }
    res.status(200).send("Authentication Successful!");
});


module.exports = router;