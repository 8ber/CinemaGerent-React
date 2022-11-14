var express = require('express');
var router = express.Router();
const authBL = require('../BL/authBL')
const apiDAL = require('../DAL/cinemagerentApiDAL')
const jwt = require('jsonwebtoken')
const usersDataBL = require('../BL/usersDataBL')

//getAllData 
router.get('/all', authBL.validateToken, async function (req, res) {
  try {
    let movies = await apiDAL.getAll();
    res.status(200).send(movies.data);
  }
  catch (err) {
    console.log(err)
    res.status(401).send(err);
  }
});



module.exports = router;