//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var property_schema = new Schema({
	owner_id: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rent: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default:5
    },
    comments: {
        type: [String],
    },
},{
	timestamps: true
});

//creating model 
var Properties = mongoose.model('Property',property_schema);

// make the model available to the application.
module.exports = Properties;