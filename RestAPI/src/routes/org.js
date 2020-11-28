
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
  if(name && email && phone_number && bt_id && bs_id && org_link){
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
  const {name, description, email, phone_number, bt_id, bs_id, org_link, org_id} = req.body;
  if(name && email && phone_number && bt_id && bs_id && org_link && org_id){
    dao.updateOrganization(name, description, email, phone_number, bt_id, bs_id, org_link, org_id)
    res.status(200).send("Organization updated.");
  }
  else{
    res.status(404).send("Error: Missing Parameter")
  }
});

router.put('/inactiveOrganization', (req, res) => {
  const {is_active, org_id} = req.body;
  if(is_active && org_id)
  {
    dao.inactivateOrganization(is_active, org_id)
    res.status(200).send("Organization inactivated.");
  }
  else{
    res.status(404).send("Error: Missing Parameter")
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