const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
//const organizations = require('../organizations.json');
const dao  = require('../DAO/business_step_dao');

//Function to gather the business steps
router.get('/businessStep', async (req,res) =>{
  const steps = await dao.getSteps()
  console.log(steps)
 res.send(steps)
});


module.exports = router;