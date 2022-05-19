const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/user.js')



users.post('/login', (req, res) => {
 
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    Login.create(req.body, (err, createdUser) => {
      console.log('user is created', createdUser)
      res.redirect('/')
    })
  })

  users.get('/login', (req, res) => {
    res.render('login.ejs', { currentUser: req.session.currentUser })
  })

users.post('/login', (req, res) => {
    Login.findOne({ name: req.body.name }, (err, foundUser) => {
       
        if (err) {
          console.log(err)
          res.send('oops the db had a problem')
        } else if (!foundUser) {
        
          res.send('<a  href="/">Sorry, no user found </a>')
        } else {
        
          if (bcrypt.compareSync(req.body.password, foundUser.password)) {
         
            req.session.currentUser = foundUser
         
            res.redirect('/')
          } else {
        
            res.send('<a href="/"> password does not match </a>')
          }
        }
      })
    })
  



    users.post('/register', (req, res)=>{
    
        const hashedPassword = bcrypt.hashSync(req.body.password.toString(), bcrypt.genSaltSync(10))
          Login.create({name: req.body.name, password: hashedPassword}, (err, newUser)=>{
           if (err){
             console.log(err)
           }else{
             console.log(newUser)
           }
          })
          res.redirect('/login')
        })

module.exports = users 