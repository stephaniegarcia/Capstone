const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
//const organizations = require('../organizations.json');
const dao  = require('../DAO/business_stage_dao');

//Function to gather the business steps
router.get('/businessStages', async (req,res) =>{
  const steps = await dao.getStages()
  console.log(steps)
 res.send(steps)
});

module.exports = router;