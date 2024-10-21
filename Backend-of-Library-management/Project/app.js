const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const url = "mongodb+srv://"+process.env.ATLASLINK+"@projectlib.jxzt1.mongodb.net/Books?retryWrites=true&w=majority"
mongoose.connect(url)
const conec = mongoose.connection
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
const bookrouter = require('./Routers/Books')
const userrouter = require('./Routers/Users')
app.use('/Books',bookrouter)
app.use('/Users',userrouter)
app.listen(3000)
conec.on('open',function(){
    console.log("connected")
})
