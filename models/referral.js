const mongoose = require("mongoose");
const Student = require("./student");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ReferralSchema = new Schema({
 referrer_email: {type:String,unique:true},
 user_email:{type:String,unique:true},
 code: String,
 dateOfUse: Date,
 amountToReferrer: Number,
 amountToUser:Number,
});

const Referral = mongoose.model('Referral',ReferralSchema);
module.exports = Referral;