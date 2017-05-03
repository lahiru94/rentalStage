//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var comment_schema = new Schema({
	property_id: {
        type: String,
        required: true,
    },
    commenter_id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    
},{
	timestamps: true
});

//creating model 
var Comments = mongoose.model('Comment',comment_schema);

// make the model available to the application.
module.exports = Comments;