const { Router } = require('express');
const router = Router();
const dao  = require('../DAO/question_dao');

/**
 * @route /api/questions
 * @description gather the questions
 * @returns all the business steps
 */
router.get('/api/questions', async (req,res) =>{
  const questions = await dao.getQuestions()
  console.log(questions)
 res.send(questions)
});

module.exports = router;