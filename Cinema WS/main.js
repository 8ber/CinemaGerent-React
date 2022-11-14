const express = require('express');
var cors = require('cors')
require('./configs/mongoose')

const app = express();

app.use(cors()) //disabling cross origion resource sharing 
app.use(express.json())


//declaring routers
const authRouter = require('./routers/auth')
const adminRouter = require('./routers/admin')
const dataRouter = require('./routers/data')
const membersRouter = require('./routers/members')
const subscriptionsRouter = require('./routers/subscriptions')
const moviesRouter = require('./routers/movies')
// using (on EVEREY incoming request) the routers imported above
app.use('/api/auth', authRouter)
app.use('/api/data', dataRouter)
app.use('/api/members', membersRouter)
app.use('/api/subscriptions', subscriptionsRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/admin', adminRouter)

app.listen(4000)
console.log("Cinema WS - API is running...")