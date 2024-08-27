const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema
const userSchema = new Schema ({

    userName : String
})


// compile the schema as a model
const User = mongoose.model('User', userSchema);


// export the model
module.exports = User ;


