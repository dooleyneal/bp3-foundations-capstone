require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getGroceries, displayLists, getLists} = require('./controller.js') 


app.use(express.json())
app.use(cors())


app.post('/seed', seed)

app.get('/groceries', getGroceries)
app.get('/grocery_lists', displayLists)
app.get('/grocery_lists', getLists)



app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))