const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
//const organizations = require('../organizations.json');
const dao  = require('../DAO/business_type_dao');

//Function to gather the business types
router.get('/businessType', async (req,res) =>{
  const types = await dao.getTypes()
  console.log(types)
 res.send(types)
});

module.exports = router;