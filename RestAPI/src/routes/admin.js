const { Router } = require('express');
const router = Router();
const { _ } = require('underscore');
//const organizations = require('../organizations.json');
const dao  = require('../DAO/admin_dao');

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

router.post('/admin', (req, res) => {
  const {user_id} = req.body;
  dao.createAdmin(user_id)
});

module.exports = router;