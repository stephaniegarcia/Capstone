
const { Router } = require('express');
const { nodemailer } = require('nodemailer');
const router = Router();



router.get('/', (req, res) =>{
    res.send(`Tu Camino Empresarial`);
});

router.get('/home', (req, res) => {
    res.json({"Titulo": "Hello World"})
});

router.get('/user/:userId', (req,res) => {

});



router.post('/register', (req, res) => {

    const {firstname, lastname, business_status, email, phone_number, requested_assistance, password} = req.body;

    if (firstname && lastname && business_status && email && password){
        //insert query should be here


        if(phone_number){
            
            if(validName(firstname) && validName(lastname) && validEmail(email) && validPhone(phone_number)){
                console.log("Insert user");
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


router.post('/login', (req,res) => {

    console.log(req.body);
    const {email, password} = req.body;
   
    if(email && password){

        res.status(200).send("logged");
    }
    else{
        res.status(400).send("error");
    }
});

router.put('/user', (req, res) => {
    //res.json({"Titulo": "Hello World"})
    res.send();
    console.log(req.test);
});


router.delete('user/:userId', (req,res) => {

});

module.exports = router;