require('dotenv').config();

const express = require('express')
const app = express()
const { getHomePage } = require('./routes/homeRouter')
const PORT = process.env.SERVICE_PORT

app.use(express.json())
app.use('/home', getHomePage)

app.listen(PORT, () => {
    console.log('nodejs service started at port: ' + PORT)
})