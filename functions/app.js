

const express = require('express');
const serverless = require('serverless-http');
const router = express.Router();
const mongoose = require('mongoose');
// const allRoutes = require('../routes/allRoutes');
const app = express();
require('dotenv').config(); // using .env
const port = process.env.PORT || 3001;
const dbString = process.env.DATABASE_URL;

const bodyParser = require('body-parser');

const Customer = require('../models/customer');
const moment = require('moment'); // for adding timestamps in my DB schema


// parse application/json
// app.use(bodyParser.json())

const methodOverride = require('method-override') // For delete function


app.use(express.urlencoded({extended : true}));

app.use(express.json());
app.use(express.static('public')) // public is a folder contains static files like css, js or images
app.use(methodOverride('_method')) // For delete function

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

//-----------DB connection ---------------
mongoose.connect(dbString)
.then( () => {console.log("Database successfuly conencted !")})
.catch( (Error) => {console.log(Error)});


// Function to get the base path dynamically
const getBasePath = () => {
    return process.env.NODE_ENV === 'production' ? '/.netlify/functions/api' : '';
};

const basePath = getBasePath();


    
    
//-----------------Get API 1 ---------------
router.get('/', (req, res) => {
    Customer.find()
    .then( (result) => {res.render("index", {customers: result, moment : moment})})
    .catch((err) => {console.log(err)}) })
    
    
    //-----------------Get API 2 ---------------
router.get('/user/add', (req, res) => {
      
       res.render("user/add", {})})
     
    //-----------------Get API 3 ---------------
router.get('/success', (req, res) => {
      
      Customer.find()
      .then( (result) => { res.render("user/addconf", {title : "Confirmation", cname : result})})
      .catch( (err) => { console.log(err)}) })
        
    
    
    
    
     //-------- /!\ Warning Let API with variables (:id) at the end according to the reg ex :id is recognized as string like /add, /view------------- 
      
    //----------------- Get API 4---------------
router.get("/edit/:id", (req, res) => {
    
      Customer.findById(req.params.id)
        .then((result)=>{res.render("user/edit", {customer : result, moment : moment})}) 
        .catch( (err) => {console.log(err)}) })
    
    
    //----------------- Get API 5  --------------
     
router.get("/view/:id", (req, res) => {
        Customer.findById(req.params.id)
        .then((result)=>{res.render("user/view", {customer : result, moment : moment})})
        .catch( (err) => {console.log(err)})  })
      
     
    
    
    //----------------- POST API  1 --------------
router.post("/user/add", (req, res) => {
    
     const cust = new Customer(req.body);// u can use cust.save() res.redirect("/success")
     Customer.create(req.body) // DO NOT USE Customer.insertOne(req.body); A Mongoose model doesn't have an insertOne method. Use the create method instead:
     .then( () => { })
     .catch( (er) => {console.log(er)}); 
    })
    
    
    //-----------------POST API 2 ---------------
router.post('/search', (req, res) => {
    
      //console.log(req.body.keyword)
      
      Customer.find({$or: [{ firstName: { $regex: req.body.keyword, $options: "i" } }, { lastName: { $regex: req.body.keyword, $options: "i" } }]})
      .then( (result) => { console.log(result); res.render("user/search", {customers : result, moment : moment})})
      .catch( (err) => { console.log(err)}) })
        
//----------------- Update API--------------
router.put("/update/:id", (req, res) => {
     
    Customer.updateOne({_id : req.params.id}, req.body).then(()=>{console.log("updated") ; res.redirect('/')})
    .catch( (err) => {console.log(err)})})
  
    // or Customer.findByIdAndUpdate(req.params.id, req.body) 
          
    
    //----------------- DELETE API--------------
    // or Customer.findByIdAndDelete(req.params.id) 
router.delete("/delete/:id", (req, res) => {
    console.log('done')
    Customer.deleteOne({_id : req.params.id})
    .then(()=>{res.redirect('/')})
    .catch( (err) => {console.log(err)}) })

app.use( basePath,router); 

app.listen(port, () => {
 
console.log("We are up and running, captain ! ")
console.log(`http://localhost:${port}/`) });

//app.use(allRoutes);

// Export the serverless handler for Netlify
module.exports.handler = serverless(app); 