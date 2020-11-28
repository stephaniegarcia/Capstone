
const { Router } = require('express');
var nodemailer  = require('nodemailer');
const randomstring = require('randomstring');
const dao  = require('../DAO/user_dao');

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


let transporter = nodemailer.createTransport({
    service: 'gmail',
 auth: {
        user: 'capstonehelix@gmail.com',
        pass: 'zybcev-reRfac-0vikpo'
    }
});

router.post('/user/changePassword', (req, res) => {

    const email = req.body.email;
    console.log(email);
    passwordtoken = randomstring.generate();
    host=req.get('host');
    link="http://"+req.get('host')+"/newPassword/user/" +email+ "?id="+passwordtoken;
    mailOptions={
        from: 'fernan3119@gmail.com',
        to : email,
        subject : "Cambio de contraseña",
        html : "<br> Presione el enlace para cambiar su contraseña.<br><a href="+link+">Presione aqui.</a>"
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, response) => {
        if(error){
            console.log(error);
            res.send("error");
        }
        else{
            console.log("Message sent: " + response.message);
            res.send("sent");
        }
});
});


router.get('/newPassword/user/:email',(req,res) =>{

    console.log(req.query.id);
    const email = req.params.body;
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==passwordtoken)
        {
            console.log("email is verified");
            res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});


router.put('user/password', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email && password){

        let change = dao.changePassword(email, password);
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



router.get('/verify/:email', async (req,res) => {
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
        res.send("<h1>Email "+req.params.email+" is been Successfully verified");
        }
    }
    else
    {
        console.log("email is not verified");
        res.send("<h1>Bad Request</h1>");
    }
    
});

router.post('/register', (req, res) => {

    const {firstname, lastname, business_status, email, phone_number, requested_assistance, password} = req.body;

    if (firstname && lastname && business_status && email && password){
        //insert query should be here
        if(phone_number){
            if(validName(firstname) && validName(lastname) && validEmail(email) && validPhone(phone_number)){
                
                token = randomstring.generate();
                dao.createUser(firstname,lastname,email,password, true, phone_number, null, null, 1, 0, token);
                host=req.get('host');
                link="http://"+req.get('host')+"/verify/" + email + "?id="+token;
                mailOptions={
                    from: 'capstonehelix@gmail.com',
                    to : email,
                    subject : "Favor de confirmar su correo electronico",
                    html : "<br> Presione el enalce para confirmar su cuenta.<br><a href="+link+">Click here to verify</a>" 
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
    }
    else{
        res.status(400).send("Error");
    }
});

router.get('/users', async (req,res) =>{
    const users = await dao.getUsers()
    console.log(users)
   res.send(users)
});

router.post('/login', async (req,res) => {

    const {email, password} = req.body;

    if(email && password){
        if(validEmail(email)){
            let login = await dao.login(email, password);
            if(login instanceof Error){
                res.status(400).send("wrong credentials")
            }
            else{
                res.status(200).send(login);
            }
        }
        else{
            res.status(400).send("error");
        }
    }
    else{
        res.status(400).send("error");
    }
});

router.get('/user/:userId', async (req,res) => {
    const id = parseInt(req.params.userId)

    let user = await dao.getUserById(id);
    if(user instanceof Error){
        res.status(404).send("User not found");
    }
    else{
        res.status(200).send(user);
    }
    

});

router.put('/user/:userId', async (req, res) => {
    
    const {firstname, lastname, business_status, phone_number, business_stage} = req.body;
    
    
    if (firstname && lastname && business_status){
        if(phone_number){  
            if(validName(firstname) && validName(lastname) && validPhone(phone_number)){
                
                let value = await dao.updateUser(req.params.userId, firstname, lastname, business_status, phone_number, business_stage);
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
    var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return String(phone).search (filter) != -1;
}

function validName(name) {
    var filter = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
    return String(name).search (filter) != -1;
}

module.exports = router;