 
const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const app = express();
const port = 3001;
require('dotenv').config();
const dbString = process.env.DATABASE_URL;
var moment = require('moment');

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

//-----------------Get API 1 ---------------
app.get('/', (req, res) => {
Customer.find()
.then( (result) => {res.render("index", {customers: result, moment : moment})
  
})
.catch((err) => {console.log(err)
  
})
})

//-----------------Get API 2 ---------------
app.get('/user/add', (req, res) => {
  
   res.render("user/add", {})})
 
//-----------------Get API 3 ---------------
app.get('/success', (req, res) => {
  
  Customer.find()
  .then( (result) => { res.render("user/addconf", {title : "Confirmation", cname : result})})
  .catch( (err) => { console.log(err)})
    
})


 //-------- /!\ Warning Let API with variables (:id) at the end according to the reg ex :id is recognized as string like /add, /view------------- 
  
//----------------- Get API 4---------------
app.get("/edit/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((result)=>{res.render("user/edit", {customer : result, moment : moment})})
    .catch( (err) => {console.log(err)})
})

//----------------- Get API 6  --------------
 
  app.get("/view/:id", (req, res) => {
    Customer.findById(req.params.id)
    .then((result)=>{res.render("user/view", {customer : result, moment : moment})})
    .catch( (err) => {console.log(err)})
  
  })


//----------------- POST API--------------
app.post("/user/add", (req, res) => {
 
 const cust = new Customer(req.body);
 cust.save()
 .then( () => { res.redirect("/success")})
 .catch( (er) => {console.log(er)});
})




//res.render("user/view", {customer : result}) 66cf3007f2182609d5991c21
console.log("hello")


app.listen(port, () => {
  
  console.log(`http://localhost:${port}/`)
});