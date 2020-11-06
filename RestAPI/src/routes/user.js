
const { Router } = require('express');
const { nodemailer } = require('nodemailer');
const { _ } = require('underscore');
const users = require('../sample.json');
const router = Router();





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

router.get('/user/:userId', (req,res) => {
    //console.log(req.params);
    user = {
        "id" : "1",
        "firstname" : "juan1",
        "lastname" : "del pueblo",
        "business_status" : "activo",
        "email" : "test@test.com",
        "phone_number" : "123-456-9999",
        "requested_assistance" : "money",
        "password" : "password"
    }

    if (user){
        res.status(200).json(user);
    }
    else{
        res.status(404).send("User not found");
    }

});

router.put('/user/:userId', (req, res) => {
    
    const {firstname, lastname, business_status, phone_number} = req.body;
    
    if (firstname && lastname && business_status ){
      
        if(phone_number){
            
            if(validName(firstname) && validName(lastname) && validPhone(phone_number)){
                
                _.each(users, (user, i) => {
                    
                    if(user.id == req.params.userId){
                        user.firstname = firstname;
                        user.lastname = lastname;
                        user.business_status = business_status;
                        user.phone_number = phone_number;

                    }
                });
                console.log("Update user: " + req.params.userId);
                res.status(200).json(users);
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



router.delete('/user/:userId', (req,res) => {
    let isDeleted = false;
    _.each(users, (user, i) => {            
        if(user.id == req.params.userId){
            users.splice(i,1);
            isDeleted = true;
        }
    });

    if(isDeleted){
        res.status(200).json(users);
    }
    else {
        res.status(404).send('User not found.');
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