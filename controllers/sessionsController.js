const bcrypt = require('bcrypt')
const express = require('express')
const route = express.Router()
const User = require('../models/user.js')
const admin = {
  username: "MidoriStone",
  password: "art"
}


route.post('/login', (req, res)=>{
  if(req.body.username === admin.username && req.body.password === admin.password){
    res.redirect('/')
  }else{
    res.send('incorrect. you are not milan')
  }
})


module.exports = route