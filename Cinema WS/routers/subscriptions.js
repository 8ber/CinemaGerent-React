var express = require('express');
var router = express.Router();
const authBL = require('../BL/authBL')
const apiDAL = require('../DAL/cinemagerentApiDAL')
const jwt = require('jsonwebtoken')
const usersDataBL = require('../BL/usersDataBL')


//create new subscription
router.post('/createsubscription', authBL.validateToken, async function (req, res) {
    try {
      let subToCreate = req.body
      let response = await apiDAL.sendSubs(subToCreate);
      res.status(200).send(response.data);
    }
    catch (err) {
      console.log(err)
      res.status(401).send(err);
    }
  });
  
  //update subscription
  router.post('/updatesubscription', authBL.validateToken, async function (req, res) {
    try {
      let subToUpdate = req.body
      let response = await apiDAL.updateSubs(subToUpdate);
      res.status(200).send(response.data);
    }
    catch (err) {
      console.log(err)
      res.status(401).send(err);
    }
  });


module.exports = router;