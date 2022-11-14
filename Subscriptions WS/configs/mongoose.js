//Setting up configuration for the mongoose schemas
//connectiong the ODM to the DB

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinemagerent_api_subscriptions')

