const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema
const customerSchema = new Schema ({

firstName: String,
lastName: String,
email: String,
phoneNumber: String,
age: Number,
country: String,
gender: String
})


// compile the schema as a model
const Customer = mongoose.model('Customer', customerSchema);


// export the model
module.exports = Customer ;


