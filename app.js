require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
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

//-----------------Get API 1 ---------------
app.get('/', (req, res) => {
Customer.find()
.then( (result) => {res.render("index", {customers: result})
  
})
.catch((err) => {console.log(err)
  
})
})

//-----------------Get API 2 ---------------
app.get('/user/add.html', (req, res) => {
  
   res.render("user/add", {})})
 
//-----------------Get API 3 ---------------
app.get('/user/view.html', (req, res) => {
  
  res.render("user/view", {})})
  
  
//----------------- Get API 4---------------
app.get("/user/edit.html", (req, res) => {
  res.render("user/edit", {})})
//----------------- Get API 5 --------------
app.get('/success', (req, res) => {
  
    Customer.find()
    .then( (result) => { res.render("user/addconf", {title : "Confirmation", cname : result})})
    .catch( (err) => { console.log(err)})
      
  })

//----------------- POST API--------------
app.post("/user/add.html", (req, res) => {
 
 const cust = new Customer(req.body);
 cust.save()
 .then( () => { res.redirect("/success")})
 .catch( (er) => {console.log(er)});
})

app.get("/user/:id", (req, res) => {
  Customer.findById(req.params.id).then((result)=>{res.render("user/view", {customer : result})})
  .catch( (err) => {console.log(err)})

})


//res.render("user/view", {customer : result}) 66cf3007f2182609d5991c21
console.log("hello")


app.listen(port, () => {
  
  console.log(`http://localhost:${port}/`)
});