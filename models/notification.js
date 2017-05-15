
//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var notification_schema = new Schema({
	agreement_id: {
        type: String,
        required: true,
    },
    reciever_id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"unseen",
        enum:["unseen","seen","discarded"]
    },
    type:{
        type:String,
        required:true,
        enum:["payment_record","payment_reminder"]
    },
    month:{
    	type:String,
    	enum:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    activity_record_id:{
        type:String
    }


    
},{
	timestamps: true
});

//creating model 
var Notification = mongoose.model('Notification',notification_schema);

// make the model available to the application.
module.exports = Notification;