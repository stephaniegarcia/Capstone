const { Router } = require('express');
const router = Router();
const dao  = require('../DAO/business_type_dao');



/**
 * @route /api/businessType
 * @description gather the business types
 * @returns all the business types
 */
router.get('/api/businessType', async (req,res) =>{
  const types = await dao.getTypes()
  console.log(types)
 res.send(types)
});

module.exports = router;