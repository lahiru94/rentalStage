//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var rent_request_schema = new Schema({
	property_id: {
        type: String,
        required: true,
    },
    requester_id: {
        type: String,
        required: true,
    },
    requester_name:{
        type:String,
        required:true
    },
    reciever_id:{
        type:String,
        require:true
    },
    message: {
        type: String,
        required:false
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","accepted","rejected"]
    }
},{
	timestamps: true
});

//creating model 
var RentRequests = mongoose.model('RentRequest',rent_request_schema);

// make the model available to the application.
module.exports = RentRequests;