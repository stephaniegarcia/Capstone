
const { Router } = require('express');
const dao = require('../DAO/tce_dao')


const router = Router();

/**
 * @route /api/tce/questions
 * @description route to gather the questions
 * @return questions
 */
router.get('/api/tce/questions', async (req, res) => {

    let questions = await dao.getQuestions();

    if(questions instanceof Error){
        res.status(400).send(questions.stack)
    }
    else{
        res.status(200).send(questions);
    }

});


/**
 * @route /api/tce/roadmap/organizations/:type
 * @description routes that brings organizations by type
 * @param type
 * @return organizations
 */
router.get('/api/tce/roadmap/organizations/:type', async (req, res) => {
    const type = req.params.type;

    if (type){

        let organizations = await dao.getOrganizationsByType(type);
        if(organizations instanceof Error){
            res.status(400).send(organizations.stack)
        }
        else{
            res.status(200).send(organizations);
        }

    }
    else {
        res.status(400).send("Error");
    }

});




/**
 * @route /api/tce/answers/:userID
 * @description routes to save the answers
 * @param answer1
 * @param answer2
 * @param answer3
 * @param answer4
 * @param answer5
 * @param answer6
 * @param answer7
 * @param answer8
 * @param answer9
 * @param answer10
 * @param answer11
 * 
 */
router.post('/api/tce/answers/:userID', async (req, res) => {
    const {answer1,answer2,answer3,answer4,answer5,answer6,answer7,
    answer8,answer9,answer10,answer11} = req.body;
    let type = 0;

  
    if((answer9 && answer10 && answer11) || (answer9 && answer10) || (answer10 && answer11)|| (answer9 && answer11) || answer9){
        type = 4;
    }
    else if((answer6 && answer7 && answer8) || (answer6 && answer7) || (answer7 && answer8) || (answer6 && answer8)){
        type = 3;
    }
     else if((answer5 && answer5) || answer5 || answer4){
        type = 2;
    }
    else if((answer1 && answer2 && answer3) || (answer1 && answer2) || (answer2 && answer3) || (answer1 && answer3) || answer3){
        type = 1;
    }
    else{
        res.status(400).send("No se puede determinar con las respuestas. Para mas informacion llamar a Colmena66 a 787.525.4111");
    }

    
    let answers = await dao.saveAnswers(req.params.userID,answer1,answer2,answer3,answer4,answer5,answer6,answer7,
            answer8,answer9,answer10,answer11);
    let bs_type = await dao.setType(req.params.userID, type);

    if(answers instanceof Error || bs_type instanceof Error) {
        res.status(400).send("Query error");
    }
    else{
        res.status(200).send("Answers saved");
    }

});




/**
 * @route /api/tce/answers/:userID
 * @description routes to save the new answers
 * @param answer1
 * @param answer2
 * @param answer3
 * @param answer4
 * @param answer5
 * @param answer6
 * @param answer7
 * @param answer8
 * @param answer9
 * @param answer10
 * @param answer11
 * 
 */
router.put('/api/tce/answers/:userID', async (req, res) => {
    const {answer1,answer2,answer3,answer4,answer5,answer6,answer7,
    answer8,answer9,answer10,answer11} = req.body;
    let type = "";
    
    if((answer9 && answer10 && answer11) || (answer9 && answer10) || (answer10 && answer11)|| (answer9 && answer11)){
        type = 4;
    }
    else if((answer6 && answer7 && answer8) || (answer6 && answer7) || (answer7 && answer8) || (answer6 && answer8)){
        type = 3;
    }
     else if((answer5 && answer5) || answer5 || answer4){
        type = 2;
    }
    else if((answer1 && answer2 && answer3) || (answer1 && answer2) || (answer2 && answer3) || (answer1 && answer3) || answer3){
        type = 1;
    }
    else{
        res.status(400).send("No se puede determinar con las respuestas. Para mas informacion llamar a Colmena66 a 787.525.4111");
    }
    
    let answers = await dao.changeAnswers(req.params.userID,answer1,answer2,answer3,answer4,answer5,answer6,answer7,
            answer8,answer9,answer10,answer11);
    let bs_type = await dao.setType(req.params.userID, type);

    if(answers instanceof Error || bs_type instanceof Error) {
        res.status(400).send("Query error");
    }
    else{
        res.status(200).send("Answers saved");
    }

});



/**
 * @route /api/tce/user/:userID/organizations
 * @description return the organizations by user
 * @param userID
 * @returns organization
 */
router.get('/api/tce/user/:userID/organizations', async (req, res) => {

    const organization = await dao.organizationsByUser(req.params.userID);
    if(organization instanceof Error){
        res.status(400).send("Error");
    }
    else{
        res.status(200).send(organization);
    }
});

/**
 * @route /api/referred/contacted
 * @description return the referredvscontacted organizations
 * @returns organizations
 */
router.get('/api/referred/contacted', async (req,res) =>{
    const organizations = await dao.getOrganizationsReferredVersusContacted()
    console.log(organizations)
   res.send(organizations)
});

router.get('/api/roadmap/:btID/:bstageID', async (req,res) =>{
    const roadmap = await dao.getRoadMap(req.params.bstageID,req.params.btID)
    console.log(roadmap)
    for(var i = 0; i < roadmap.length; i++) {
        const types = await dao.getOrganizationsTypes(roadmap[i].org_id);
        roadmap[i].types = types;
    }
    console.log(roadmap)
   res.send(roadmap)
});

module.exports = router;