// getting required modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport_local_mongoose  = require('passport-local-mongoose');

// create a schema
var user_schema = new Schema({
    
    username: {//propmt for email,named as username since middleware use this
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    contact_no: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//adding passport local plugin to schema
// user_schema.plugin(passport_local_mongoose);

// adding schema to model
var Users = mongoose.model('User', user_schema);

// make the model available to the application.
module.exports = Users;







// dishRouter.route('/')
// .get(function (req, res, next) {
//     Dishes.find({}, function (err, dish) {
//         if (err) throw err;
//         res.json(dish);
//     });
// })

// .post(function (req, res, next) {
//     Dishes.create(req.body, function (err, dish) {
//         if (err) throw err;
//         console.log('Dish created!');
//         var id = dish._id;

//         res.writeHead(200, {
//             'Content-Type': 'text/plain'
//         });
//         res.end('Added the dish with id: ' + id);
//     });
// })