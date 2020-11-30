const { Router } = require('express');
const router = Router();
//const organizations = require('../organizations.json');
const dao  = require('../DAO/admin_dao');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
var nodemailer  = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
auth: {
      user: 'capstonehelix@gmail.com',
      pass: 'zybcev-reRfac-0vikpo'
  }
});

router.get('/admins', async (req,res) =>{
  const admins = await dao.getAdmins()
  console.log(admins)
 res.send(admins)
});

router.get('/admin/:adminID', async (req,res) => {
  const admin = await dao.getAdminByID(req.params.adminID)
  console.log(admin)
  res.send(admin)
});

router.post('/admin', async (req, res) => {
  const {email, password} = req.body;

    if(email && password){
        if(validEmail(email)){
            let adminLogin = await dao.loginAdmin(email, password);
            if(adminLogin instanceof Error){
                res.status(400).send("wrong credentials")
            }
            else{
                res.status(200).send(adminLogin);
            }
        }
        else{
            res.status(400).send("error");
        }
    }
    else{
        res.status(400).send("error");
    }
});

router.post('/admin/changePassword', (req, res) => {

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


router.get('/newPassword/admin/:email', async (req,res) =>{

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


router.put('/admin/password', (req,res) => {
  const email = req.body.email;
  const password = req.body.password;

  if(email && password){

      let change = dao.changePassword(email, password);
      console.log(email + password)
      if(change instanceof Error){
          res.status.send("Query error")
      }
      else{
          res.status(200).send(change)
      }

  }
  else{
      res.status(400).send("Error");
  }
});

// Validates email address of course.
function validEmail(email) {
  var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(email).search (filter) != -1;
}
module.exports = router;