const express = require('express')
const app = express()
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs')
const swaggerDocument = yaml.load('./docs/swagger.yaml');

//Copy env variables to process.env
require('dotenv').config()

//Run middlewares
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Import routes
const usersRoute = require('./routes/users')
const sessionsRoute = require('./routes/sessions')
const transactionsRoute = require('./routes/transactions')

//Attach routes
app.use('/users', usersRoute)
app.use('/sessions', sessionsRoute)
app.use('/transactions', transactionsRoute)

//Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false, 
    useUnifiedTopology: true
}, ()=>{
    console.log('Connected to DB!')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:` + process.env.PORT)
})
