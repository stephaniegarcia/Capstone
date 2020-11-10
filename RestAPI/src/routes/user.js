
const { Router } = require('express');
const { nodemailer } = require('nodemailer');
const { _ } = require('underscore');
const users = require('../users.json');
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
        if(validEmail(email)){
            res.status(200).send(`Email: ${email} Password: ${password}`);
        }
        else{
            res.status(400).send("error");
        }

        
    }
    else{
        res.status(400).send("error");
    }
});

router.get('/user/:userId', (req,res) => {
    //console.log(req.params);
    
    let i = 0;
    let founded = false;

    if(users){
        users.forEach((user) => {
            if(req.params.userId == user.id){
                res.status(200).json(user);
                founded = true;
            }
        })

    }

    if (!founded){
        res.status(404).send("User not found");
    }

});

router.put('/user/:userId', (req, res) => {
    
    const {firstname, lastname, business_status, phone_number} = req.body;
    let founded = false;
    
    if (firstname && lastname && business_status ){
      
        if(phone_number){
            
            if(validName(firstname) && validName(lastname) && validPhone(phone_number)){
                
                users.forEach((user) => {
                    if(user.id == req.params.userId){
                        founded = true;
                        user.firstname = firstname;
                        user.lastname = lastname;
                        user.business_status = business_status;
                        user.phone_number = phone_number;
                        console.log("Update user: " + req.params.userId);
                        res.status(200).json(users);
                    }
                });
                
            }
            else{
                res.status(400).send("Error");
            }
        }
        
    }
    else{
        res.status(400).send("Error");
    }

    if(!founded){
        res.status(404).send("User not found");
    }
});



router.delete('/user/:userId', (req,res) => {
    let isDeleted = false;
    
    let i = 0;
    users.forEach((user) => {
        console.log(user);          
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