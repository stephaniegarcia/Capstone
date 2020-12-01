const { Router } = require('express');
const router = Router();
const dao  = require('../DAO/business_step_dao');

/**
 * @route /api/businessStep
 * @description gather the business steps
 * @returns all the business steps
 */
router.get('/api/businessStep', async (req,res) =>{
  const steps = await dao.getSteps()
  console.log(steps)
 res.send(steps)
});


module.exports = router;