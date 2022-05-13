//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const seed = require('./models/seed')
const Data = require('./models/schema')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
    console.log('connected to mongo')
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

// ----------- seed route ----------- // 

// app.get('/seed', (req, res) => {
//   Data.create(seed, (err, Data) => {
//     console.log('SEEDED DATA PLEASE COMMENT OUT GET ROUTE')
//   })
//   res.redirect('/')
// })

// ----------- get routes ----------- // 
app.get('/:id', (req, res) => {
  Data.findById(req.params.id, (error, view) =>{
    res.render('show.ejs',
    { items: view })
  })
})


app.get('/' , (req, res) => {
  Data.find({}, (err, display) => {
    res.render('index.ejs', 
    { items: display })
  })
})


app.get('/about', (req, res) => {
  res.send('this will be the about page')
})


















//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));