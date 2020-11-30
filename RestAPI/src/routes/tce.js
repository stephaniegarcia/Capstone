
const { Router } = require('express');
const dao = require('../DAO/tce_dao')


const router = Router();

router.get('/tce/questions', async (req, res) => {

    let questions = await dao.getQuestions();

    if(questions instanceof Error){
        res.status(400).send(questions.stack)
    }
    else{
        res.status(200).send(questions);
    }

});

//aun falta definir bien como se va a filtrar
router.get('/tce/organizations/filter', async (req, res) => {

    const {stage, type} = req.body;

    if(stage || type){
        let organizations = await dao.getOrganizationsFiltered(2,2);
        if(organizations instanceof Error){
            res.status(400).send("Error");
        }
        else{
            res.status(200).send(organizations);
        }
    }
    else{
        res.status(404).send("Error")
    }

});

router.get('/tce/roadmap/organizations/:type', async (req, res) => {
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


router.get('/tce/answers/user/:userID', (req, res) => {


    if(answers){

    }
    else{
        res.status(400).send("Error");
    }

    if(founded){
        res.status(200).json(etr.answers);
    }
    else{
        res.status(404).send("User not found");
    }
});

router.get('/tce/businesstype/user/:userID', (req, res) => {

    const types =  [
        {
            userID: "1",
            type : "microempresa"
        },
        {
            userID: "2",
            type : "comerciante"
        },
        {
            userID: "3",
            type : "empresa basada en innovacion"
        }
    ];

    let i = 0;
    let founded = false;
    let etr;

    if(types){
        types.forEach((user) => {
            if(req.params.userID == user.userID){
                founded = true;
                etr = user;

            }
        });
    }
    else{
        res.status(400).send("Error");
    }

    if(founded){
        res.status(200).json(etr.type);
    }
    else{
        res.status(404).send("User not found");
    }
});

router.post('/tce/answers/:userID', async (req, res) => {
    const {answer1,answer2,answer3,answer4,answer5,answer6,answer7,
    answer8,answer9,answer10,answer11} = req.body;
    let type = "";
    console.log(answer1);
    
        if(((answer1 && answer2 && answer3) || (answer1 && answer2) || (answer2 && answer3) || (answer1 && answer3) || answer3)
            && (!answer4 && !answer5 && !answer6 && !answer7 && !answer8 && !answer9 && !answer10 && !answer11)){
                type = 1;
                //res.status(200).send(`User with id: ${req.params.userID} is Microempresa`);
                
        }
        else if(((answer5 && answer5) || answer5 || answer4)
            && (!answer1 && !answer2 && !answer3 && !answer6 && !answer7 && !answer8 && !answer9 && !answer10 && !answer11)){
                type = 2;
                //res.status(200).send(`User with id: ${req.params.userID} is Comerciante`);
        }
        else if(((answer6 && answer7 && answer8) || (answer6 && answer7) || (answer7 && answer8) || (answer6 && answer8))
            && (!answer1 && !answer2 && !answer3 && !answer4 && !answer5 && !answer9 && !answer10 && !answer11)){
                type = 3
                //res.status(200).send(`User with id: ${req.params.userID} is Empresa Basada en Innovacion`);
        }
        else if(((answer9 && answer10 && answer11) || (answer9 && answer10) || (answer10 && answer11)|| (answer9 && answer11))
            && (!answer1 && !answer2 && !answer3 && !answer4 && !answer5 && !answer6 && !answer7 && !answer8)){
                type = 4;
                //res.status(200).send(`User with id: ${req.params.userID} is Empresa en Crecimiento`);
        }
        else{
            res.status(400).send("No se puede determinar con las respuestas.");
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


router.post('/tce/businesstype/:userID', (req, res) => {

    const {type} = req.body;

    if(type){
        res.status(200).send(`User with id ${req.params.userID} is ${type}`);
    }
    else{
        res.status(400).send("Error");
    }

});





router.put('/tce/answers/:userID', async (req, res) => {
    const {answer1,answer2,answer3,answer4,answer5,answer6,answer7,
    answer8,answer9,answer10,answer11} = req.body;
    let type = "";
    console.log(answer1);
    
        if(((answer1 && answer2 && answer3) || (answer1 && answer2) || (answer2 && answer3) || (answer1 && answer3) || answer3)
            && (!answer4 && !answer5 && !answer6 && !answer7 && !answer8 && !answer9 && !answer10 && !answer11)){
                type = 1;
                //res.status(200).send(`User with id: ${req.params.userID} is Microempresa`);
        }
        else if(((answer5 && answer5) || answer5 || answer4)
            && (!answer1 && !answer2 && !answer3 && !answer6 && !answer7 && !answer8 && !answer9 && !answer10 && !answer11)){
                type = 2;
                //res.status(200).send(`User with id: ${req.params.userID} is Comerciante`);
        }
        else if(((answer6 && answer7 && answer8) || (answer6 && answer7) || (answer7 && answer8) || (answer6 && answer8))
            && (!answer1 && !answer2 && !answer3 && !answer4 && !answer5 && !answer9 && !answer10 && !answer11)){
                type = 3;
                //res.status(200).send(`User with id: ${req.params.userID} is Empresa Basada en Innovacion`);
        }
        else if(((answer9 && answer10 && answer11) || (answer9 && answer10) || (answer10 && answer11)|| (answer9 && answer11))
            && (!answer1 && !answer2 && !answer3 && !answer4 && !answer5 && !answer6 && !answer7 && !answer8)){
                type = 4
                //res.status(200).send(`User with id: ${req.params.userID} is Empresa en Crecimiento`);
        }
        else{
            res.status(400).send("No se puede determinar con las respuestas.");
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

router.get('/tce/user/:userID/organizations', (req, res) => {

    console.log(req.params.userID);
    if(req.params.userID){
        res.status(200).send(organizations);
    }
    else{
        res.status(404).send("User not found");
    }

});

router.get('/referred/contacted', async (req,res) =>{
    const organizations = await dao.getOrganizationsReferredVersusContacted()
    console.log(organizations)
   res.send(organizations)
});

router.get('/roadmap/:btID', async (req,res) =>{
    const roadmap = await dao.getRoadMap(req.params.btID)
    console.log(roadmap)
   res.send(roadmap)
});


module.exports = router;