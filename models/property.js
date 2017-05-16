//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var property_schema = new Schema({
	owner_id: {
        type: String,
        required: true,
    },
    owner_name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    district: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rent: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        default:"available",
        enum:["available","reserved","rented"]
    },
    rating:{
        type:Number,
        default:10
    }
    //keep ratings and comments sepaerately
},{
	timestamps: true
});

//creating model 
var Properties = mongoose.model('Property',property_schema);

// make the model available to the application.
module.exports = Properties;