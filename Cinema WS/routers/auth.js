var express = require('express');
var router = express.Router();
const authBL = require('../BL/authBL')
const jwt = require('jsonwebtoken')
const usersDataBL = require('../BL/usersDataBL')

//main auth - login route
router.post('/login', async function (req, res) {
  try {
    //verfing the user against the DB:
    let isFound = await authBL.login(req.body)
    if (isFound.loginStatus) {
      //creating a token for the user:
      let token = await authBL.signToken(isFound.id)
      res.status(200).send({ token });
    }
  }
  catch (err) { res.status(401).send(err); }
});

//after logging in, sending required user data to the client
router.get('/userinfo', authBL.validateToken, async function (req, res) {
  let userinfo = await authBL.getUserData(req.user.id);
  res.status(200).send({ ...userinfo });
});


router.post('/register', async function (req, res) {
  try {
    let isMutable = await authBL.checkUser(req.body)
    if (isMutable) {
      authBL.storePassword(req.body).then((x) => {
        res.status(201).send("Account created. Please login with your new password.");
      })
    }
  }
  catch (err) { res.status(401).send(err); }
});


module.exports = router;