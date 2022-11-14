var express = require('express');
var router = express.Router();
const authBL = require('../BL/authBL')
const apiDAL = require('../DAL/cinemagerentApiDAL')
const jwt = require('jsonwebtoken')
const usersDataBL = require('../BL/usersDataBL')

router.post('/postMember', authBL.validateToken, async function (req, res) {
    try {
        let memberToAdd = req.body;
        let response = await apiDAL.postMember(memberToAdd);
        res.status(200).send(response.data);
    }
    catch (err) {
        console.log(err)
        res.status(401).send(err);
    }
});

router.post('/putMember', authBL.validateToken, async function (req, res) {
    try {
        let memberToEdit = req.body;
        let response = await apiDAL.putMember(memberToEdit);
        res.status(200).send(response.data);
    }
    catch (err) {
        console.log(err)
        res.status(401).send(err);
    }
});

router.post('/deleteMember', authBL.validateToken, async function (req, res) {
    try {
        let memberToDelete = req.body.id;
        let response = await apiDAL.deleteMember(memberToDelete);
        res.status(200).send(response.data);
    }
    catch (err) {
        console.log(err)
        res.status(401).send(err);
    }
});

module.exports = router;