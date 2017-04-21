// getting required modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var user_schema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact_no: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


// adding schema to model
var Users = mongoose.model('User', user_schema);

// make themodel available to the application.
module.exports = Users;