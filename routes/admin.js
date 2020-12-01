const { Router } = require('express');
const router = Router();
const dao  = require('../DAO/admin_dao');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
var nodemailer  = require('nodemailer');
const bcrypt = require('bcrypt');
saltRounds = 10;

let transporter = nodemailer.createTransport({
  service: 'gmail',
auth: {
      user: 'capstonehelix@gmail.com',
      pass: 'zybcev-reRfac-0vikpo'
  }
});

/**
 * 
 * @route /api/admin 
 * 
 * @description route for log in as an administrator
 * 
 * @param body
 * @param password
 * 
 * @return true if the credentials are correct
 * 
 */
router.post('/api/admin', async (req, res) => {
  const {email, password} = req.body;

    if(email && password){
        if(validEmail(email)){

            hashedPassword = await dao.getPassword(email);
            
            if(hashedPassword[0]){
                const isMatchingPassword = bcrypt.compareSync(password, hashedPassword[0].password)
                
                login = {
                    "Match" : isMatchingPassword,
                    "admin_id": hashedPassword[0].admin_id
                } 
                res.status(200).send(login);
            }
            else{
                res.status(400).send("Esta cuenta no existe o no esta verificada.");
            }
        }
        else{
            res.status(400).send("Error: Invalid Email!");
        }
    }
    else{
        res.status(400).send("error");
    }
});

/**
 * @route /api/admin/changePassword
 * 
 * @description route to recieve the email of the administrator
 * 
 * @param email
 * 
 * @returns an email with the link to change the password
 * 
 */
router.post('/api/admin/changePassword', (req, res) => {

  const email = req.body.email;
  console.log(email);
  passwordtoken = randomstring.generate();
  host =  process.env.WebsiteUrl || req.get('host');
  link="http://"+host+"/newPassword/admin/" +email+ "?id="+passwordtoken;
  let insertToken = dao.insertPasswordToken(email, passwordtoken);
  if(insertToken instanceof Error){
      res.status(404).send("User not found");
  }
  mailOptions={
      from: 'capstonehelix@gmail.com',
      to : email,
      subject : "Cambio de contraseña",
      html : "<br> Presione el enlace para cambiar su contraseña.<br><a href="+link+">Presione aqui.</a>"
  }
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, response) => {
      if(error){
          console.log(error);
          res.status(400).send("error");
      }
      else{
          console.log("Message sent: " + response.message);
          res.status(200).send("sent");
      }
});
});

/**
 * 
 * @route /api/newPassword/admin/:email
 * @description route that verifies the token of change password
 * @param :email
 * @param id
 * 
 * @returns the validation for the email
 * 
 */
router.get('/api/newPassword/admin/:email', async (req,res) =>{

  console.log(req.query.id);
  const email = req.params.body;
  let passwordToken = await dao.getPasswordToken(req.params.email);

      if(req.query.id==passwordToken[0]["reset_token"])
      {
          res.status(200).end("<h1>Email "+req.params.email+" validated");
      }
      else
      {
          res.status(400).send("<h1>Bad Request</h1>");
      }


});

/**
 * @route /api/admin/password
 * @description route to change the administrator password
 * @param email
 * @param password
 * 
 */
router.put('/api/admin/password', async (req,res) => {
  const email = req.body.email;
  const password = req.body.password;

  if(email && password){
    hashedPassword = bcrypt.hashSync(password,saltRounds);

      let change = await dao.changePassword(email, hashedPassword);
      if(change instanceof Error){
          res.status(400).send(change)
      }
      else{
          res.status(200).send(change)
      }

  }
  else{
      res.status(400).send("Error");
  }
});

/**
 * @function validEmail 
 * @description verify that the email has the correct format
 * @param {*} email 
 * @returns true if is valid, otherwise return false
 */
function validEmail(email) {
  var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(email).search (filter) != -1;
}
module.exports = router;