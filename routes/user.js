
const { Router } = require('express');
const router = Router();
var nodemailer  = require('nodemailer');
const randomstring = require('randomstring');
const dao  = require('../DAO/user_dao');
const bcrypt = require('bcrypt');
const { token } = require('morgan');
saltRounds = 10;

/**
 * 
 * @constructor Pool
 * 
 * 
 * @augments user
 * @augments host
 * @augments database
 * @augments password
 * @augments port
 * 
 * @description Constructor for data base autenticacion
 */
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'colmena66@tucaminoempresarial2',
    host: 'tucaminoempresarial2.postgres.database.azure.com',
    database: 'capstone',
    password: '6rrz9afwZ1994!@',
    port: 5432
})



/**
 * 
 * @constructor Pool
 * 
 * 
 * @augments service
 * @augments auth
 * @augments user
 * @augments pass
 * 
 * @description Constructor for nodemailer
 */
let transporter = nodemailer.createTransport({
    service: 'gmail',
 auth: {
        user: 'capstonehelix@gmail.com',
        pass: 'zybcev-reRfac-0vikpo'
    }
});


/**
 * @route /api/user/changePassword'
 * @description route to change the password
 * @param email
 */
router.post('/api/user/changePassword', (req, res) => {

    const email = req.body.email;
    console.log(email);
    passwordtoken = randomstring.generate();
    host =  process.env.WebsiteUrl ||  "http://" +req.get('host')
    link=host+"/newPassword/user/" +email+ "?id="+passwordtoken;
    let insertToken = dao.insertPasswordToken(email, passwordtoken);
    if(insertToken instanceof Error){
        res.status(404).send("User not found");
    }
    mailOptions={
        from: 'capstonehelix@gmail.com',
        to : email,
        subject : "Cambio de contraseña",
        html : "<br> Presione el enlace para cambiar su contraseña.<br><a href="+link+">Presione aqui.</a>",
        attachments: [{
            filename: 'colmena.png',
            path: 'routes/colmena.png',
            cid: 'test' //same cid value as in the html img src
        }]
    }
    transporter.sendMail(mailOptions, (error, response) => {
        if(error){
            console.log(error);
            res.status(400).send("error");
        }
        else{
            console.log("Message sent: " + response.message);
            res.status(200).send("sent");
        }
    });
});

/**
 * @route /api/newPassword/user/:email'
 * @description route to change the password
 * @param email
 */
router.get('/api/newPassword/user/:email', async (req,res) =>{

    console.log(req.query.id);
    const email = req.params.body;
    let passwordToken = await dao.getPasswordToken(req.params.email);

        if(req.query.id==passwordToken[0]["reset_password_token"])
        {
            res.status(200).end("<h1>Email "+req.params.email+" validated");
        }
        else
        {
            res.status(400).send("<h1>Bad Request</h1>");
        }
});

/**
 * @route /api/user/password'
 * @description route to change the password on data base
 * @param email
 * @param password
 */
router.put('/api/user/password', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    hashedPassword = bcrypt.hashSync(password,saltRounds);

    if(email && password){

        let change = dao.changePassword(email, hashedPassword);
        console.log(email + password)
        if(change instanceof Error){
            res.status.send("Query error")
        }
        else{
            res.status(200).send(change)
        }

    }
    else{
        res.status(400).send("Error");
    }
});


/**
 * @route /api/verify/:email
 * @description route to verify the email when registered
 */
router.get('/api/verify/:email', async (req,res) => {

    let userToken = await dao.getToken(req.params.email);
    if(req.query.id==userToken[0]["verify_token"]) {
        const ver = dao.verify(req.params.email);
        if(ver instanceof Error){
            res.status(400).send("error")
        }
        else{
        console.log("email is verified");
        res.status(200).send("<h1>Email "+req.params.email+" is been Successfully verified");
        }
    }
    else
    {
        console.log("email is not verified");
        res.status(400).send("<h1>Bad Request</h1>");
    }
});

/**
 * @route /api/register
 * @description route to register new users
 * @params firstname, lastname, business_status, business_stage, email, phone_number, requested_assistance, password
 * 
 */
router.post('/api/register', (req, res) => {

    const {firstname, lastname, business_status, business_stage, email, phone_number, requested_assistance, password} = req.body;

    if (firstname && lastname && business_status && email && password){
        //insert query should be here
            if(validName(firstname) && validName(lastname) && validEmail(email) && validPhone(phone_number)){
                var registerToken = randomstring.generate();
                hashedPassword = bcrypt.hashSync(password,saltRounds)
                dao.createUser(firstname,lastname,email,hashedPassword, business_status, requested_assistance, phone_number, null, business_stage, 1, 0, registerToken);
                var hostUrl = process.env.WebsiteUrl || "http://" +req.get('host');
                link=hostUrl+"/verify/" +email+ "?id="+registerToken;
                mailOptions={
                    from: 'capstonehelix@gmail.com',
                    to : email,
                    subject : "Tu Camino Empresarial",
                    html : `<img src="cid:test"> 
                    <br> Te damos la bienvenida a Tu Camino Empresarial. Presione el enlace para confirmar su cuenta.<br><a href="${link}">Presiona aqui para verificar tu cuenta.</a>`,
                    attachments: [{
                        filename: 'colmena.png',
                        path: 'routes/colmena.png',
                        cid: 'test' //same cid value as in the html img src
                    }]
                }
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                        res.send("error");
                    }
                    else{
                        console.log("Message sent: " + response.message);
                        res.send("sent");
                    }
                });

                res.status(200).send("User registered");
            }
            else{
                res.status(400).send("Error");
            }

    }
    else{
        res.status(400).send("Error");
    }
});


/**
 * @route /api/login
 * @description route to login 
 * @params email, password
 */
router.post('/api/login', async (req,res) => {

    const {email, password} = req.body;

    if(email && password){
        if(validEmail(email)){

            hashedPassword = await dao.getPassword(email);
            if(hashedPassword[0]){
                const isMatchingPassword = bcrypt.compareSync(password, hashedPassword[0].user_password)
                await dao.log(hashedPassword[0].user_id);
                login = {
                    "Match" : isMatchingPassword,
                    "user_id": hashedPassword[0].user_id
                }
                res.status(200).send(login);
            }
            else{
                res.status(400).send("Esta cuenta no existe o no esta verificada.");
            }
        }
        else{
            res.status(400).send("Error: Invalid Email!");
        }
    }
    else{
        res.status(400).send("Error: Missing parameters!");
    }
});


router.get('/api/user/:userId', async (req,res) => {
    const id = parseInt(req.params.userId)

    let user = await dao.getUserById(id);
    if(user instanceof Error){
        res.status(404).send("User not found");
    }
    else{
        res.status(200).send(user);
    }
});

/**
 * @route /api/user/:userId
 * @description route to edit account
 * @params firstname, lastname, business_status, phone_number, bstage_id, requested_assistance
 */
router.put('/api/user/:userId', async (req, res) => {
    
    const {firstname, lastname, business_status, phone_number, bstage_id, requested_assistance} = req.body;
    
    
    if (firstname && lastname && business_status && bstage_id && requested_assistance){ 
            if(validName(firstname) && validName(lastname) && validPhone(phone_number)){
                
                let value = await dao.updateUser(req.params.userId, firstname, lastname, business_status, phone_number, bstage_id, requested_assistance);
                console.log(value)
                if(value instanceof Error){
                    res.status(400).send("Error in query");
                }
                else{
                    res.status(200).send(value);
                }
            }
            else{
                res.status(400).send("Error in validation");
            }
    }
    else{
        res.status(400).send("Error in values");
    }

});





// Validates email address of course.
function validEmail(email) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(email).search (filter) != -1;
}

function validPhone(phone) {
    if(phone){
        var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return String(phone).search (filter) != -1;
    }
    else{
        return " "
    }
}

function validName(name) {
    var filter = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    return String(name).search (filter) != -1;
}

module.exports = router;