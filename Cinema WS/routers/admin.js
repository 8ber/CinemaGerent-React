var express = require('express');
var router = express.Router();
const authBL = require('../BL/authBL')
const jwt = require('jsonwebtoken')
const usersDataBL = require('../BL/usersDataBL')

router.get('/all', authBL.validateToken, async function (req, res) {
    try {
      let allUsersData = await usersDataBL.getUsers();
      res.status(200).send(allUsersData);
    }
    catch (err) {
      console.log(err)
      res.status(401).send(err);
    }
  });

  router.post('/add', authBL.validateToken, async function (req, res) {
    try {
      let addUser = await usersDataBL.addUser(req.body);
      res.status(200).send(addUser);
    }
    catch (err) {
      console.log(err)
      res.status(401).send(err);
    }
  });

  router.put('/edit', authBL.validateToken, async function (req, res) {
    try {
      let UserToEdit = await usersDataBL.updateUser(req.body);
      res.status(200).send(UserToEdit);
    }
    catch (err) {
      console.log(err)
      res.status(401).send(err);
    }
  });

  router.delete('/delete/:id', authBL.validateToken, async function (req, res) {
    try {
        console.log(req.params.id)
      let UserToDel = await usersDataBL.deleteUser(req.params.id);
      res.status(200).send(UserToDel);
    }
    catch (err) {
      console.log(err)
      res.status(401).send(err);
    }
  });

module.exports = router;