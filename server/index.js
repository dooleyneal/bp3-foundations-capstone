require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getGroceries, displayLists, getLists, createNewList, deleteList, addToList, displayListItems, deleteItem} = require('./controller.js') 

app.use(express.static('public'))
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => { 
    res.sendFile(path.join(__dirname, '../public/index.html'))
    res.sendFile(path.join(__dirname, '../server/controller.js'))
})
app.post('/seed', seed)

app.get('/groceries', getGroceries)
app.get('/grocery_lists', displayLists)
app.get('/grocery_lists', getLists)
app.post('/grocery_lists', createNewList)
app.delete('/grocery_lists/:id', deleteList)
app.put('/grocery/:id', addToList)
app.delete('/grocery/:id', deleteItem)
app.post(`/groceries`, displayListItems)


const port = process.env.PORT || SERVER_PORT
app.listen(port, () => console.log(`up on ${port}`))