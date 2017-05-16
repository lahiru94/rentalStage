//getting required models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating schema
var message_schema = new Schema({
    agreement_id: {
        type: String,
        required: true,
    },
    sender_id: {
        type: String,
        required: true,
    },
    reciever_id:{
        type:String,
        require:true
    },
    message: {
        type: String,
        required:false
    },
},{
    timestamps: true
});

//creating model 
var Message = mongoose.model('Message',message_schema);

// make the model available to the application.
module.exports = Message;