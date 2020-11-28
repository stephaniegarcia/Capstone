
const { Router } = require('express');
//const organizations = require('../organizations.json');
const dao = require('../DAO/tce_dao')


const router = Router();

router.get('/tce/questions', async (req, res) => {

    let questions = await dao.getQuestions();

    if(questions instanceof Error){
        res.status(400).send(questions.stack)
    }
    else{
        //console.log(questions);
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

router.get('/tce/roadmap/organizations', async (req, res) => {
    const type = req.body.type;

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

    const answers =  [
        {
            userID: "1",
            answers : [true, true, false, false, false, false, false, false, false, false, false]
        },
        {
            userID: "2",
            answers : [false, false, false, false, false, false, false, false, true, true, false]
        },
        {
            userID: "3",
            answers : [false, false, true, false, false, false, false, false, false, false, false]
        }
    ];

    let i = 0;
    let founded = false;
    let etr;

    if(answers){
        answers.forEach((user) => {
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

router.post('/tce/answers/:userID', (req, res) => {
    const {answer1,answer2,answer3,answer4,answer5,answer6,answer7,
    answer8,answer9,answer10,answer11} = req.body;
    let type = "";
    console.log(answer1);
    
        if(((answer1 && answer2 && answer3) || (answer1 && answer2) || (answer2 && answer3) || (answer1 && answer3) || answer3)
            && (!answer4 && !answer5 && !answer6 && !answer7 && !answer8 && !answer9 && !answer10 && !answer11)){
                res.status(200).send(`User with id: ${req.params.userID} is Microempresa`);
        }
        else if(((answer5 && answer5) || answer5 || answer4)
            && (!answer1 && !answer2 && !answer3 && !answer6 && !answer7 && !answer8 && !answer9 && !answer10 && !answer11)){
                res.status(200).send(`User with id: ${req.params.userID} is Comerciante`);
        }
        else if(((answer6 && answer7 && answer8) || (answer6 && answer7) || (answer7 && answer8) || (answer6 && answer8))
            && (!answer1 && !answer2 && !answer3 && !answer4 && !answer5 && !answer9 && !answer10 && !answer11)){
                res.status(200).send(`User with id: ${req.params.userID} is Empresa Basada en Innovacion`);
        }
        else if(((answer9 && answer10 && answer11) || (answer9 && answer10) || (answer10 && answer11)|| (answer9 && answer11))
            && (!answer1 && !answer2 && !answer3 && !answer4 && !answer5 && !answer6 && !answer7 && !answer8)){
                res.status(200).send(`User with id: ${req.params.userID} is Empresa en Crecimiento`);
        }
        else{
            res.status(400).send("No se puede determinar con las respuestas.");
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


router.post('/tce/organization/:orgID/user/:userID/rating', (req, res) => {

    let ratings = [
        {
            orgid : "1",
            userID: "4",
            rating : "3"
        },
        {
            orgid : "1",
            userID: "5",
            rating : "4"
        },
        {
            orgid : "3",
            userID: "1",
            rating : "1"
        },
        {
            orgid : "2",
            userID: "9",
            rating : "4"
        }
    ]

    const {rating} = req.body;

    if(rating){
        let newRating = {

            orgid : req.params.orgID,
            userID : req.params.userID,
            rating: rating

        }
        ratings.push(newRating);
        res.status(200).json(ratings);

    }
    else{
        res.status(400).send("Error");
    }
        
    

});

router.post('/tce/organization/:orgID/user/:userID/comment', (req, res) => {

    let comments = [
        {
            id : "1",
            orgid : "1",
            userID: "4",
            comment : "No contestaron nunca."
        },
        {
            id : "2",
            orgid : "1",
            userID: "2",
            comment : "Me ayudaron mucho"
        },
        {
            id : "3",
            orgid : "3",
            userID: "4",
            comment : "La persona que me atendio me trato mal"
        },
        {
            id : "4",
            orgid : "2",
            userID: "1",
            comment : "Quede fascinado con la ayuda"
        }
    ]

    const {comment} = req.body;

    if(comment){
        let newComment = {
            id : 5,
            orgid : req.params.orgID,
            userID: req.params.userID,
            comment: comment

        }
        comments.push(newComment);
        res.status(200).json(comments);

    }
    else{
        res.status(400).send("Error");
    }

});

router.post('/tce/organization/:orgID/user/:userID/check', (req, res) => {

    let checks = [
        {
            orgid : "1",
            userID: "4",
            check : true
        },
        {
            orgid : "1",
            userID: "2",
            check : true
        },
        {
            orgid : "3",
            userID: "4",
            comment : false
        },
        {
            orgid : "2",
            userID: "1",
            check : true
        }
    ]

    const {check} = req.body;

    if(check){
        let newCheck = {

            orgid : req.params.orgID,
            userID: req.params.userID,
            check: check

        }
        checks.push(newCheck);
        res.status(200).json(checks);

    }
    else{
        res.status(400).send("Error");
    }

});


router.put('/tce/answers/:userID', (req, res) => {
    const {answer1,answer2,answer3,answer4,answer5,answer6,answer7,
    answer8,answer9,answer10,answer11} = req.body;
    let type = "";
    console.log(answer1);
    
        if(((answer1 && answer2 && answer3) || (answer1 && answer2) || (answer2 && answer3) || (answer1 && answer3) || answer3)
            && (!answer4 && !answer5 && !answer6 && !answer7 && !answer8 && !answer9 && !answer10 && !answer11)){
                res.status(200).send(`User with id: ${req.params.userID} is Microempresa`);
        }
        else if(((answer5 && answer5) || answer5 || answer4)
            && (!answer1 && !answer2 && !answer3 && !answer6 && !answer7 && !answer8 && !answer9 && !answer10 && !answer11)){
                res.status(200).send(`User with id: ${req.params.userID} is Comerciante`);
        }
        else if(((answer6 && answer7 && answer8) || (answer6 && answer7) || (answer7 && answer8) || (answer6 && answer8))
            && (!answer1 && !answer2 && !answer3 && !answer4 && !answer5 && !answer9 && !answer10 && !answer11)){
                res.status(200).send(`User with id: ${req.params.userID} is Empresa Basada en Innovacion`);
        }
        else if(((answer9 && answer10 && answer11) || (answer9 && answer10) || (answer10 && answer11)|| (answer9 && answer11))
            && (!answer1 && !answer2 && !answer3 && !answer4 && !answer5 && !answer6 && !answer7 && !answer8)){
                res.status(200).send(`User with id: ${req.params.userID} is Empresa en Crecimiento`);
        }
        else{
            res.status(400).send("No se puede determinar con las respuestas.");
        }
    
});


router.put('/tce/organization/:orgID/user/:userID/rating', (req, res) => {

    let ratings = [
        {
            orgid : "1",
            userID: "4",
            rating : "3"
        },
        {
            orgid : "1",
            userID: "5",
            rating : "4"
        },
        {
            orgid : "3",
            userID: "1",
            rating : "1"
        },
        {
            orgid : "2",
            userID: "9",
            rating : "4"
        }
    ]

    const {rating} = req.body;

    if(rating){
        let newRating = {

            orgid : req.params.orgID,
            userID : req.params.userID,
            rating: rating

        }
        ratings.push(newRating);
        res.status(200).json(ratings);

    }
    else{
        res.status(400).send("Error");
    }
        
});

router.delete('/tce/organization/:orgID/user/:userID/comment/:commentID', (req, res) => {

    let comments = [
        {
            id : "1",
            orgid : "1",
            userID: "4",
            comment : "No contestaron nunca."
        },
        {
            id : "2",
            orgid : "1",
            userID: "2",
            comment : "Me ayudaron mucho"
        },
        {
            id : "3",
            orgid : "3",
            userID: "4",
            comment : "La persona que me atendio me trato mal"
        },
        {
            id : "4",
            orgid : "2",
            userID: "1",
            comment : "Quede fascinado con la ayuda"
        }
    ]

    let i = 0;
    let isDeleted = false;

    comments.forEach((comment) => {
        if(comment.id == req.params.commentID){
            comments.splice(i,1);
            isDeleted = true;
        }
        i++;
    });


    if(isDeleted){
       res.status(200).json(comments);
    }
    else{
        res.status(400).send("Comment not found");
    }

});

router.delete('/tce/organization/:orgID/user/:userID/check/:checkID', (req, res) => {

    let checks = [
        {
            id : 1,
            orgid : "1",
            userID: "4",
            check : true
        },
        {
            id : 2,
            orgid : "1",
            userID: "2",
            check : true
        },
        {
            id : 3,
            orgid : "3",
            userID: "4",
            comment : false
        },
        {
            id : 4,
            orgid : "2",
            userID: "1",
            check : true
        }
    ]

    let i = 0;
    let isUnchecked = false;

    checks.forEach((check) => {
        if(check.id == req.params.checkID){
            check.check = false;
            isUnchecked = true;
        }
        i++;
    });
    if(isUnchecked){
        res.status(200).json(checks);

    }
    else{
        res.status(400).send("Error");
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


module.exports = router;