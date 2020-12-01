const { Router } = require('express');
const router = Router();
const dao  = require('../DAO/business_stage_dao');


/**
 * @route /api/businessStages
 * @description gather the business stages
 * @returns all the business stages
 */
router.get('/api/businessStages', async (req,res) =>{
  const steps = await dao.getStages()
  console.log(steps)
  res.send(steps)
});


module.exports = router;