//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var agreement_schema = new Schema({
	title: {
        type: String,
        required: true,
    },
    property_id: {
        type: String,
        required: true,
    },
    landlord_id: {
        type: String,
        required: true,
    },
    tenant_id: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    rent: {
        type: Number,
    },
    status:{
        type:String,
        default:"pending"
    },
    
},{
	timestamps: true
});

//creating model 
var Agreements = mongoose.model('Agreement',agreement_schema);

// make the model available to the application.
module.exports = Agreements;