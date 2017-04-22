//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var agreement_schema = new Schema({
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
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    rent: {
        type: Number,
        required: true,
    },
    
},{
	timestamps: true
});

//creating model 
var Agreements = mongoose.model('Agreement',agreement_schema);

// make the model available to the application.
module.exports = Agreements;