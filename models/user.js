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
    username: {//propmt for email,named as username since middleware use this
        type: String,
        required: true,
    },
    password: {
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
    },
    admin:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


// adding schema to model
var Users = mongoose.model('User', user_schema);

// make the model available to the application.
module.exports = Users;