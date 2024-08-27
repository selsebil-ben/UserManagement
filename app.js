require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();
const port = 3001;
const dbString = process.env.DATABASE_URL;


app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static('public')) // public is a folder contains static files like css, js or images

app.set('view engine','ejs');

//-------Auto refrech--------------

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer(); 
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
setTimeout(() => {
liveReloadServer.refresh("/");
}, 100);
});

//---------------------------------



mongoose.connect(dbString)
.then( () => {console.log("Database successfuly conencted !")})
.catch( (Error) => {console.log(Error)});

app.get('/', (req, res) => {


res.render("home", {title: "Home page"})})


app.post("/adduser", (req, res) => {
  console.log(req.body);
  const name = new User(req.body);
  name.save()
  .then( () => { res.redirect("/success") })
  .catch( (er) => {console.log(er)});
   
})

app.get('/success', (req, res) => {
  
  User.find()
  .then( (result) => { res.render("index", {title: "Confirmation page", uname : result})})
  .catch( (err) => { console.log(err)})
    
})

app.listen(port, () => {
  
  console.log(`http://localhost:${port}/`)
});