//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//creating schema
var rating_schema = new Schema({
	property_id: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    
});

//creating model 
var Ratings = mongoose.model('Rating',rating_schema);

// make the model available to the application.
module.exports = Ratings;