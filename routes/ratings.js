const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
//const organizations = require('../organizations.json');
const dao  = require('../DAO/ratings_dao');

//Average Evaluation of organizations
router.get('/ratings', async (req,res) =>{
  const average_evaluations = await dao.getAverageEvaluations()
  console.log(average_evaluations)
 res.send(average_evaluations)
});

//Top 10 Organizations per business type
router.get('/topTenPerBT/:btID', async (req,res) =>{
    const ratings = await dao.getTopTenBT(req.params.btID)
    console.log(ratings)
   res.send(ratings)
});

//Top 10 Organizations per business stage
router.get('/topTenPerBS/:bstageID', async (req,res) =>{
    const ratings = await dao.getTopTenBS(req.params.bstageID)
    console.log(ratings)
   res.send(ratings)
});

//Organizations performing poorly
router.get('/badOrganizations', async (req,res) =>{
    const ratings = await dao.getOrgPerformingPoorly()
    console.log(ratings)
   res.send(ratings)
});

//Report of accounts created by year, and week
router.get('/accountsCreated', async (req,res) =>{
    const ratings = await dao.getAccountsPerWeek()
    console.log(ratings)
   res.send(ratings)
});

//Comments for every organization
router.get('/comments', async (req,res) =>{
    const comments = await dao.getComments()
    console.log(comments)
   res.send(comments)
});

//Count of organizations contacted
router.get('/organizationsContacted', async (req,res) =>{
    const comments = await dao.getContactedCount()
    console.log(comments)
   res.send(comments)
});

//Inserting a rating and comment (optional) for an organization
router.post('/ratings', (req, res) => {
    const {rating, user_id, organization_id, rating_comment} = req.body;
    if(rating && user_id && organization_id && rating_comment){
        dao.createRating(rating, user_id, organization_id, rating_comment)
        res.status(200).send("Rating added")

    }
    else{
        res.status(200).send("Error");
    }
    
  });

module.exports = router;