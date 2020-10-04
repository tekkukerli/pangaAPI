const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs')
const swaggerDocument = yaml.load('./docs/swagger.yaml');
const port = "8080"

//Copy env variables to pocess.env
require('dotenv').config()

const app = express()

//Import routes
const usersRouter = require('./routes/users')

//Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false, 
    useUnifiedTopology: true
}, ()=>{
    console.log('Connected to DB!')
})

//Run middlewares
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Attatch routes
app.use(usersRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

//see on login branch