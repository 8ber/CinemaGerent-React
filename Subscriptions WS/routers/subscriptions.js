const express = require('express');

const router = express.Router();

const servicesBL = require('../BL/servicesBL')
router.route('/getall')
    .get(async function (req, res) {
        let movies = await servicesBL.getMovies();
        let subscriptions = await servicesBL.getSubscriptions();
        let members = await servicesBL.getMembers();
        
        return res.json({movies, subscriptions, members});
    })  

    router.route('/sendSub')
    .post(async function(req, res)
    {
        newSubs = await servicesBL.createSubs(req.body)
        return res.json(newSubs);
    })

    router.route('/updateSub')
    .put(async function(req, res)
    {
        updateSub = await servicesBL.updateSub(req.body)
        return res.json(updateSub);
    })
module.exports = router