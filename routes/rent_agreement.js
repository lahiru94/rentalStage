var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Property = require('../models/property');
var Comment = require('../models/comment');
var Rating = require('../models/rating');
var RentRequest = require('../models/rent_request');
var User = require('../models/user');
var Agreement = require('../models/agreement');
var Notification = require('../models/notification');
var Payment_record = require('../models/rent_payment_record');
var Message = require('../models/message');



var router = express.Router();

router.route('/activate/:id')//this id is the agreement id
.get(isLoggedIn,function(req,res,next){
	Agreement.findById(req.params.id,function(err,agreement){
		res.render('activate_agreement.ejs',{'agreement':agreement});
	});
})
.post(isLoggedIn,function(req,res,next){
	Agreement.findByIdAndUpdate(req.params.id,
		{
			title     : req.body.title,
			start_date: req.body.start_date,
			end_date  : req.body.end_date,
			status    : "active" 
		},
		function(err,agreement){
			Property.findByIdAndUpdate(agreement.property_id,{status:"rented"},function(err,property){
				if (err) throw err;
				res.redirect('/users/dashbord');
			});
			
		});
});

router.route('/landlord/view_details/:id')//rent agreement id is reffered
.get(isLoggedIn,function(req,res,next){
	Agreement.findById(req.params.id,function(err,agreement){
		User.findById(agreement.landlord_id,function(err,landlord){
			User.findById(agreement.tenant_id,function(err,tenant){
				Property.findById(agreement.property_id,function(err,property){
					Payment_record.find({agreement_id:agreement._id},function(err,payment_records){
						Notification.find({agreement_id:agreement._id,status:"unseen",reciever_id:agreement.landlord_id},function(err,notifications){
							Message.find({agreement_id:agreement._id},function(err,messages){
								res.render('landlord_agreement_view.ejs',{
								'agreement':agreement,
								'landlord':landlord,
								'tenant': tenant,
								'property':property,
								'payment_records':payment_records,
								'notifications':notifications,
								'messages':messages
								});
							});
							
						});
					});
				});
			});
		});
	});
});


router.route('/tenant/view_details/:id')//rent agreement id is reffered
.get(isLoggedIn,function(req,res,next){
	Agreement.findById(req.params.id,function(err,agreement){
		User.findById(agreement.landlord_id,function(err,landlord){
			User.findById(agreement.tenant_id,function(err,tenant){
				Property.findById(agreement.property_id,function(err,property){
					Payment_record.find({agreement_id:agreement._id},function(err,payment_records){
						Notification.find({agreement_id:agreement._id,status:"unseen",reciever_id:agreement.tenant_id},function(err,notifications){
							Message.find({agreement_id:agreement._id},function(err,messages){
								res.render('tenant_agreement_view.ejs',{
								'agreement':agreement,
								'landlord':landlord,
								'tenant': tenant,
								'property':property,
								'payment_records':payment_records,
								'notifications':notifications,
								'messages':messages
								});
							});

						});
					});
					
				});
			});
		});
	});
});

router.route('/add_payment_record/:id')
.post(isLoggedIn,function(req,res,next){
	Agreement.findById(req.params.id,function(err,agreement){
		Payment_record.create({
			agreement_id:agreement._id,
			month:req.body.month,
			payment_type:req.body.payment_type
		},function(err,payment_record){
			Notification.create({
				agreement_id:agreement._id,
				reciever_id:agreement.landlord_id,
				type:"payment_record",
				month:req.body.month,
				activity_record_id:payment_record._id

			},function(err,notification){
				res.redirect('/rent_agreement/tenant/view_details/'+agreement._id);
			});

		});
	});
	//create notification along with the pending record
});

router.route('/accept_payment/:id')//this is payment record id
.get(isLoggedIn,function(req,res){
	Payment_record.findByIdAndUpdate(req.params.id,{status:"accepted"},function(err,payment_record){
		Notification.findOneAndUpdate({activity_record_id:req.params.id},{status:"discarded"},function(err,notification){
			res.redirect('/rent_agreement/landlord/view_details/'+payment_record.agreement_id);
		});
	});
});

router.route('/reject_payment/:id')//this is payment record id
.get(isLoggedIn,function(req,res){
	Payment_record.findByIdAndUpdate(req.params.id,{status:"rejected"},function(err,payment_record){
		Notification.findOneAndUpdate({activity_record_id:req.params.id},{status:"discarded"},function(err,notification){
			res.redirect('/rent_agreement/landlord/view_details/'+payment_record.agreement_id);
		});
	});
});

router.route('/submit_message/:id')
.post(isLoggedIn,function(req,res){
	Message.create({
		agreement_id:req.params.id,
		sender_id:req.user._id,
		reciever_id:req.body.reciever_id,
		message:req.body.message
	},function(err,message){
		Agreement.findById(req.params.id,function(err,agreement){
			if(agreement.landlord_id==req.user._id){
				res.redirect('/rent_agreement/landlord/view_details/'+agreement._id);
			}else{
				res.redirect('/rent_agreement/tenant/view_details/'+agreement._id);
			}
		})
		
	});
});



//auth
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;