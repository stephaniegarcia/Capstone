const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
const organizations = require('../organizations.json');


router.get('/organizations', (req, res) => {
    
    if (organizations){
        res.status(200).json(organizations);
    }
    else{
        res.status(400).send("Organizations not found");
    }
    
});

router.get('/organization/stars/:Id', (req, res) => {

    let founded = false;
    let average_stars;
  
    _.each(organizations, (organization, i) => {
        console.log(organization.id);
        if(organization.id == req.params.Id){
            founded = true;
            average_stars = organization.average_stars;
        }
    });

    if(founded){
        res.status(200).send(average_stars);
    }
    else{
        res.status(404).send("Organization not found");
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

router.get("/organizationsByType", (req, res) => {
    const { type } = req.body;
  
    if (type) {
      res.status(200).send(type);
    } else {
      res.status(404).send("Types not found");
    }
});

router.get("/organizationsByStage", (req, res) => {
    const { stage } = req.body;
  
    if (stage) {
      res.status(200).send(stage);
    } else {
      res.status(404).send("Stage not found");
    }
});

router.get("/organization/comments/:Id", (req, res) => {
    let founded = false;
    let i = 0;
    let comments;
  
    organizations.forEach((organization) => {
      if (organization.id == req.params.Id) {
        founded = true;
        comments = organization.comments;
      }
  
      i++;
    });
  
    if (founded) {
      res.status(200).send(comments);
    } else {
      res.status(404).send("Comments not found");
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


module.exports = router;