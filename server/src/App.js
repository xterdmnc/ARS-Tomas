const express = require('express')
const cors = require('cors')
const app = express()

const ConnectToDatabase = require('../config/db')

const UserRoute = require('../routes/User.routes')

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
}))

ConnectToDatabase()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: `Welcome`
    })
})

app.use('/api', UserRoute)


module.exports = app;