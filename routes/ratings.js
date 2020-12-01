const { Router } = require('express');
const router = Router();
const dao  = require('../DAO/ratings_dao');


/**
 * @route /api/ratings
 * @description route the get the average evaluations of the organizations
 * @returns all the average rating of each organization
 */
router.get('/api/ratings', async (req,res) =>{
  const average_evaluations = await dao.getAverageEvaluations()
 res.send(average_evaluations)
});


/**
 * @route /api/topTenPerBT/:btID
 * @description Top 10 Organizations per business type
 * @param btID
 * @returns the top 10 organizations per type
 */
router.get('/api/topTenPerBT/:btID', async (req,res) =>{
    const ratings = await dao.getTopTenBT(req.params.btID)
   res.send(ratings)
});


/**
 * @route /api/topTenPerBS/:bstageID
 * @description Top 10 Organizations per business stage
 * @param bstageID
 * @returns the top 10 organizations per stage
 */
router.get('/api/topTenPerBS/:bstageID', async (req,res) =>{
    const ratings = await dao.getTopTenBS(req.params.bstageID)
   res.send(ratings)
});

/**
 * @route /api/badOrganizations
 * @description Organizations performing poorly
 * @returns organizations performing poorly
 */
router.get('/api/badOrganizations', async (req,res) =>{
    const ratings = await dao.getOrgPerformingPoorly()
   res.send(ratings)
});

//Report of accounts created by year, and week
/**
 * @route /api/accountsCreated
 * @description Report of accounts created by year, and week
 * @returns oaccounts created by year, and week
 */
router.get('/api/accountsCreated', async (req,res) =>{
    const ratings = await dao.getAccountsPerWeek()
   res.send(ratings)
});


//Comments for every organization
/**
 * @route /api/comments
 * @description route that gathers the comments of the organizations
 * @return comments
 * 
 */
router.get('/api/comments', async (req,res) =>{
    const comments = await dao.getComments()
   res.send(comments)
});


/**
 * @route /api/organizationsContacted
 * @description Count of organizations contacted
 * @return comments
 */
router.get('/api/organizationsContacted', async (req,res) =>{
    const comments = await dao.getContactedCount()
    res.send(comments)
});

//Inserting a rating and comment (optional) for an organization
router.post('/api/ratings', (req, res) => {
    const {rating, user_id, organization_id, rating_comment} = req.body;
    if(rating && user_id && organization_id && rating_comment){
        dao.createRating(rating, user_id, organization_id, rating_comment)
        res.status(200).send("Rating added")
    }
    else{
        res.status(200).send("Error");
    }    
});

router.get('/api/ratings/:userID', async (req, res) => {
    const ratings = await dao.getRatingsPerUser(req.params.userID)
    console.log(ratings)
    res.send(ratings)
});

module.exports = router;