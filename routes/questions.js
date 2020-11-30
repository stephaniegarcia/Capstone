const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
//const organizations = require('../organizations.json');
const dao  = require('../DAO/question_dao');

//Function to gather the questions
router.get('/api/questions', async (req,res) =>{
  const questions = await dao.getQuestions()
  console.log(questions)
 res.send(questions)
});

module.exports = router;