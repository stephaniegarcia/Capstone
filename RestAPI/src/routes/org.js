
const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
const organizations = require('../organizations.json');
const dao  = require('../DAO/org_dao');

//Function to get all the organizations in the system
router.get('/organizations', async (req,res) =>{
  const organization = await dao.getOrganizations()
  console.log(organization)
 res.send(organization)
});

router.get('/organization/:orgId', async (req,res) => {
  const organization = await dao.getOrganizationByID(req.params.orgId)
  console.log(organization)
  res.send(organization)
});

router.post('/organization', (req, res) => {

  const {name, description, email, phone_number, bt_id, bs_id, is_active, org_link} = req.body;
  if(organizations_name && email && phone && stage && type && org_link){
      if(validEmail(email) && validPhone(phone)){
          dao.createOrg(name, description, email, phone_number, bt_id, bs_id, is_active, org_link)
      }
      res.status(200).send("Organization registered");
  }
  else{
      res.status(404).send("Error")
  }
});

router.put('/organization', (req, res) => {

  const {org_id, name, description, email, phone, bt_id, bs_id, is_active, org_link} = req.body;
  if(organizations_name && email && phone && stage && type && link){
      if(validEmail(email) && validPhone(phone)){
          dao.updateOrg(org_id, name, description, email, phone, bt_id, bs_id, is_active, org_link)
      }
      res.status(200).send("Organization updated.");
  }
  else{
      res.status(404).send("Error")
  }
});

router.put('/inactiveOrganization/:orgID', (req, res) => {

  const {org_id, is_active} = req.body;
  if(org_id){
        dao.inactivateOrg(org_id, is_active)
        res.status(200).send("Organization updated.");
  }
  else{
      res.status(404).send("Error")
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