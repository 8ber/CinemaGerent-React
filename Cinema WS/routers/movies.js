var express = require('express');
var router = express.Router();
const authBL = require('../BL/authBL')
const apiDAL = require('../DAL/cinemagerentApiDAL')
const jwt = require('jsonwebtoken')
const usersDataBL = require('../BL/usersDataBL')


//post a new movie
router.post('/postMovie', authBL.validateToken, async function (req, res) {
    try {
      let movToSend = req.body;
      let response = await apiDAL.postMovie(movToSend);
      res.status(200).send(response.data);
    }
    catch (err) {
      console.log(err)
      res.status(401).send(err);
    }
  });
  
  //delete movie
  router.post('/deleteMovie', authBL.validateToken, async function (req, res) {
    try {
      let movToDelete = req.body.id; //the id of the movie to delete
      let response = await apiDAL.deleteMovie(movToDelete);
      res.status(200).send(response.data);
    }
    catch (err) {
      console.log(err)
      res.status(401).send(err);
    }
  });
  
  //edit movie
  router.put('/updateMovie', authBL.validateToken, async function (req, res) {
    try {
      let movToUpdate = req.body
      let response = await apiDAL.editMovie(movToUpdate);
      res.status(200).send(response.data);
    }
    catch (err) {
      console.log(err)
      res.status(401).send(err);
    }
  });


  module.exports = router;