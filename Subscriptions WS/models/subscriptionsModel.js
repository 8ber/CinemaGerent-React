const mongoose = require('mongoose')

let subscriptionsSchema = new mongoose.Schema({
    memberid: mongoose.ObjectId,
    movies: []
})


module.exports = mongoose.model('subscriptions', subscriptionsSchema)