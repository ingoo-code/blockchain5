const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const bc = require('./block.js')
const ws = require('./network.js')
const wl = require('./wallet')

app.use(bodyParser.json())

app.get("/blocks",(req,res)=>{
    res.send(bc.getBlock())
})

app.get("/version",(req,res)=>{
    res.send(bc.getVersion())
})

app.listen(PORT,()=>{
    console.log(`server listen port : ${PORT}`)
})