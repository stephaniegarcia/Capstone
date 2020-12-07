
const { Router } = require('express');
const { type } = require('os');
const { is } = require('type-is');
const router = Router();

const dao  = require('../DAO/org_dao');


//Function to get all the organizations in the system

/**
 * @route /api/organizations
 * @description gathers all the organizations of the system
 * @returns organizations of the system
 */
router.get('/api/organizations', async (req,res) =>{
  const organizations = await dao.getOrganizations();
  console.log(organizations)
  for(var i = 0; i < organizations.length; i++) {
    // const types = await dao.getOrganizationsTypes(organizations[i].org_id);
    // organizations[i].types = types;
  }
  
  res.send(organizations)
});

/**
 * @route /api/organizations
 * @description route to get an organization based on a given id
 * @param orgId
 * @returns organization
 */
router.get('/api/organization/:orgId', async (req,res) => {
  const organization = await dao.getOrganizationByID(req.params.orgId)
  console.log(organization)
  res.send(organization)
});

/**
 * @route /api/organization
 * @description route to create a new organization
 * @param name
 * @param description
 * @param email
 * @param phone_number
 * @param bt_id
 * @param bs_id
 * @param is_active
 * @param org_link
 */
router.post('/api/organization', async (req, res) => {

  const {name, description, email, phone_number, bt_id, bs_id, is_active, org_link} = req.body;
  if(name && description && email && phone_number && bs_id && is_active && org_link){
          let org = await dao.createOrg(name, description, email, phone_number, bs_id, is_active, org_link)
          console.log(org)
          for(let i =0; i<bt_id.length;i++)
          {
              dao.attachingOrgToBusinessType(bt_id[i], org[0].org_id)
          }
          res.status(200).send("Organization registered");
  }
  else{
      res.status(404).send("Error: Some parameters are missing")
  }
});

/**
 * @route /api/organization
 * @description route tu update any organizations information
 * @param description
 * @param email
 * @param phone_number
 * @param bt_id
 * @param bs_id
 * @param org_link
 */
router.put('/api/organization', async (req, res) => {
  const {name, description, email, phone_number, bt_id, bs_id, org_link, org_id} = req.body;
  if(name && email && phone_number && bt_id && bs_id && org_link && org_id){
    let types = await dao.getOrganizationsTypes(org_id);
    //console.log(types.rows)
      for(let j = 0; j < bt_id.length; j++){
        if(!isIn(bt_id[j], types.rows)){
          dao.attachingOrgToBusinessType(bt_id[j],org_id)
          console.log(1)
        }
      }
      for(let j = 0; j < types.rows.length; j++){
        if(!isInQ(types.rows[j].bt_id, bt_id)){
          // remove from
          console.log(types.rows[j].bt_id)
          await dao.deletingOrgBusinessType(types.rows[j].bt_id, org_id)
          //console.log(r)
        }
      }
    dao.updateOrganization(name, description, email, phone_number, bs_id, org_link, org_id)
    res.status(200).send("Organization updated.");
  }
  else{
    res.status(404).send("Error: Missing Parameter")
  }
});


/**
 * @route /api/inactiveOrganization
 * @description route to delete organizations
 * @param is_active
 * @param ord_id
 */
router.put('/api/inactiveOrganization', (req, res) => {
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

//Including organizations_business_types function in here
/**
 * @route /api/businessType
 * @description gather the business types for some organization orgID
 * @returns all the business types associated to orgID
 */
router.get('/api/orgBusinessType/:orgID', async (req,res) =>{
  const types = await dao.getOrganizationsTypes(req.params.orgID);
    if(types instanceof Error){
        res.status(400).send("Error");
    }
    else{
        res.status(200).send(types);
    }
});

/**
* @route /api/businessType/:orgID
* @description gather the missing business types for an organization
* @returns all the business types missing for organization orgID
*/

router.get('/api/orgMissingTypes/:orgID', async (req,res) =>{
const types = await dao.getOrganizationsMissingTypes(req.params.orgID);
  if(types instanceof Error){
      res.status(400).send("Error");
  }
  else{
      res.status(200).send(types);
  }
});


function isIn(element, list) {
  for(let i = 0; i < list.length; i++){ 
    if(element == list[i].bt_id){
      return true;
    }
  }
  return false;
}
function isInQ(element, list) {

  for(let i = 0; i < list.length; i++){
    if(element == list[i]){
      return true;
    }
  }
  return false;
}
module.exports = router;