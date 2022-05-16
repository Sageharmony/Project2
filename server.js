const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const db = mongoose.connection; 
require('dotenv').config();
const Data = require('./models/schema');
const seed = require('./models/seed')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const PORT = process.env.PORT || 3003;
mongoose.connect('mongodb://localhost:27017/', () => {
    console.log('The connection with mongod is established');
})


const MONGODB_URI = process.env.MONGODB_URI;



// app.get('/seed', (req, res) => {
//   Data.create(seed, (err, Data) => {
//     console.log('SEEDED DATA PLEASE COMMENT OUT GET ROUTE')
//   })
// })
app.get('/new', (req, res) =>{
  res.render('new.ejs')
})



app.post('/', (req, res) => {
  Data.create(req.body, (err, newPost) => {
    res.redirect('/')
  })
})
 
  // show route //


app.get('/:id', (req, res) => {
  Data.findById(req.params.id, (error, view) =>{
    res.render('show.ejs',
    { items: view })
  })
})

app.get('/:id/edit', (req, res) =>{
  Data.findById(req.params.id, (err, edit) =>{
    res.render('edit.ejs',
    {items: edit})
  })
})
app.put('/:id', (req, res) =>{
  Data.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, items) =>{
    res.redirect('/')
  })
})

app.get('/' , (req, res) => {
  Data.find({}, (err, display) => {
    res.render('index.ejs',
    { items: display })
  })
})
app.get('/:id', (req, res) => {
  Data.findById(req.params.id, (error, view) =>{
    res.render('show.ejs',
    { items: view })
  })
})

app.delete('/:id', (req, res)=>{
  Data.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/');
  });
});




app.listen(PORT, () => 
console.log( 'Listening on port:', PORT));

