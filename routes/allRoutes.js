const express = require('express');

const router = express.Router();

const Customer = require('../models/customer');
const moment = require('moment'); // for adding timestamps in my DB schema

//-----------------Get API 1 ---------------
router.get('/', (req, res) => {
    Customer.find()
    .then( (result) => {res.render("index", {customers: result, moment : moment})})
    .catch((err) => {console.log(err)}) })
    
    
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
    console.log(req.body)
     const cust = new Customer(req.body);
     Customer.create(req.body) // DO NOT USE Customer.insertOne(req.body); A Mongoose model doesn't have an insertOne method. Use the create method instead:
     .then( () => { res.redirect("/success")})
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
     console.log(req.body)
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
    
     
    
    





module.exports = router;