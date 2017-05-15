//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var rent_payment_schema = new Schema({
	agreement_id: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        required:true,
        default:"pending",
        enum:["pending","accepted","rejected"]
    },
    payment_type:{
        type:String,
        default:"cash"
    }


    
},{
	timestamps: true
});

//creating model 
var Rent_payment_record = mongoose.model('Rent_payment_record',rent_payment_schema);

// make the model available to the application.
module.exports = Rent_payment_record;