
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
 * @description route to change the password
 * 
 * @param req
 * @param res
 * 
 * 
 */
router.post('/api/user/changePassword', (req, res) => {

    const email = req.body.email;
    console.log(email);
    passwordtoken = randomstring.generate();
    host =  process.env.WebsiteUrl || req.get('host');
    link="http://"+host+"/newPassword/user/" +email+ "?id="+passwordtoken;
    let insertToken = dao.insertPasswordToken(email, passwordtoken);
    if(insertToken instanceof Error){
        res.status(404).send("User not found");
    }
    mailOptions={
        from: 'capstonehelix@gmail.com',
        to : email,
        subject : "Cambio de contraseña",
        html : "<br> Presione el enlace para cambiar su contraseña.<br><a href="+link+">Presione aqui.</a>"
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



router.get('/api/verify/:email', async (req,res) => {
    console.log(req.protocol+":/"+req.get('host'));
    let userToken = await dao.getToken(req.params.email);
    console.log(userToken[0]["verify_token"])
    console.log(req.params.email)

    console.log("Domain is matched. Information is from Authentic email");
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

router.post('/api/register', (req, res) => {

    const {firstname, lastname, business_status, business_stage, email, phone_number, requested_assistance, password} = req.body;

    if (firstname && lastname && business_status && email && password){
        //insert query should be here
            if(validName(firstname) && validName(lastname) && validEmail(email) && validPhone(phone_number)){
                var registerToken = randomstring.generate();
                hashedPassword = bcrypt.hashSync(password,saltRounds)
                dao.createUser(firstname,lastname,email,hashedPassword, business_status, requested_assistance, phone_number, null, business_stage, 1, 0, registerToken);
                var hostUrl = process.env.WebsiteUrl || req.get('host');
                link="http://"+hostUrl+"/verify/" +email+ "?id="+registerToken;
                mailOptions={
                    from: 'capstonehelix@gmail.com',
                    to : email,
                    subject : "Favor de confirmar su correo electronico",
                    html : "<br> Presione el enlace para confirmar su cuenta.<br><a href="+link+">Click here to verify</a>" 
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

router.get('/api/users', async (req,res) =>{
    const users = await dao.getUsers()
    console.log(users)
   res.send(users)
});

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
                res.status(400).send("Account does not exist o is not verified");
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