const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
//const organizations = require('../organizations.json');
const dao  = require('../DAO/admin_dao');
const bodyParser = require('body-parser');

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

router.post('/admin/:userID', async (req, res) => {
  const admin = await dao.createAdmin(req.params.userID)
  res.send(admin)
});

module.exports = router;