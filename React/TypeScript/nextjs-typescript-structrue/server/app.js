const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors({
  origin:true,
  credentials:true
}))
app.use(bodyParser.urlencoded({extended:false,}))
app.use(bodyParser.json())

app.post('/user/login',(req,res)=>{
  res.json({
    msg:'success',
  })
})

app.listen(3001,()=>{
  console.log(`server port 3001`)
})
