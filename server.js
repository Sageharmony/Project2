//___________________
//Dependencies
//___________________

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const db = mongoose.connection;
require('dotenv').config();
const Data = require('./models/schema');
const seed = require('./models/seed');
const session = require('express-session');
const adminController = require('./controllers/admin-controller');
const path = require('path');
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
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
);

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


const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser){
    return next()
  } else {
    res.redirect('/custom')
  }
}

app.use(session({
  secret: 'images', 
  resave: false, 
  saveUninitialized: false
}))


app.get('/' , (req, res) => {
  Data.find({}, (err, display) => {
    res.render('index.ejs',
    { items: display })
  })
})



// app.get('/seed', (req, res) => {
//   Data.create(seed, (err, Data) => {
//     console.log('SEEDED DATA PLEASE COMMENT OUT ROUTE')
//   })
// })

app.get('/new', (req, res) =>{
  res.render('new.ejs')
})

app.get('/collab', (req, res) => {
  res.render('collab.ejs')
})

app.get('/custom', (req, res) => {
  res.render('custom.ejs')
})

app.get('/contact', (req, res) => {
  res.render('contact.ejs')
})
app.get('/about', (req, res) => {
  res.render('about.ejs')
})
app.get('/shadow', (req, res) => {
  Data.find({type: "Shadow"}, (err, list) =>{
    res.render('shadow.ejs',
    {list: list})
  })
})

app.get('/nature', (req, res) => {
  Data.find({type: "Nature"}, (err, list) =>{
    res.render('nature.ejs',
    {list: list})
  })
})
app.get('/blackandwhite', (req, res) => {
  Data.find({type: "Black and White"}, (err, list) =>{
    res.render('bw.ejs',
    {list: list})
  })
})
app.get('/film', (req, res) => {
  Data.find({type: "Real"}, (err, list) =>{
    res.render('mm.ejs',
    {list: list})
  })
})
app.get('/login', (req, res) => {
  res.render('login.ejs', {currentUser: req.session.currentUser})
})

app.post('/', (req, res) => {
  Data.create(req.body, (err, newPost) => {
    res.redirect('/')
  })
})

app.get('/add', (req, res) => {
  res.render('new.ejs')
})
 




app.get('/:id/edit' , (req, res) =>{
  Data.findById(req.params.id, (err, edit) =>{
    res.render('edit.ejs',
    {items: edit})
  })
})
app.put('/:id', (req, res) =>{
  Data.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, items) =>{
    res.redirect('/custom')
  })
})

app.get('/:id', (req, res) => {
  Data.findById(req.params.id, (error, list) => {
      res.render(
          'show.ejs',
          {
              collected:list
          }
      )
  })
})

app.get('/:id/delete', (req, res) =>{
  Data.findById(req.params.id, (err, edit) =>{
    res.render('delete.ejs',
    {items: edit})
  })
})
app.delete('/:id', (req, res)=>{
  Data.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/custom');
  });
});



app.listen(PORT, () => 
console.log( 'Listening on port:', PORT));

