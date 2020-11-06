const { Router } = require('express');
const router = Router();

router.get('/organizations', (req, res) => {
    const data = [
        {
            "name" : "example",
            "email" : "examenple@test.com",
            "phone" : "999-999-9999",
            "stage": ["startup"],
            "type" : ["microempresa", "empresa basada en innovacion"],
            "link" : "example.com"
        },
        {
            "name" : "example",
            "email" : "examenple@test.com",
            "phone" : "999-999-9999",
            "stage": ["startup"],
            "type" : ["microempresa", "empresa basada en innovacion"],
            "link" : "example.com"
        }
    ]
    if (data){
        res.status(200).json(data);
    }
    else{
        res.status(400).send("Data not found");
    }
    
});


router.post('/organization', (req, res) => {

    const {organizations_name, email, phone, stage, type, link} = req.body;

    console.log(type);
    if(organizations_name && email && phone && stage && type && link){
        if(validEmail(email) && validPhone(phone)){
            res.status(200).json(req.body);
        }
    }
    else{
        res.status(404).send("Error")
    }

});

router.put('organization/:id', (req, res) => {

    const {organizations_name, email, phone, stage, type, link} = req.body;

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


module.exports = router;