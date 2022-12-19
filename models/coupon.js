const mongoose = require("mongoose");
const Student = require("./student");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CouponSchema = new Schema({
//  student: ObjectId,
//  student_id_backup:Number,
 email:String,
 code: {type:String,unique:true},
 dateOfCreation: Date,
 amountToReferrer: {type:Number,default:200},
 amountToUser:{type:Number,default:200}
});

const Coupon = mongoose.model('Coupon',CouponSchema);
module.exports = Coupon;
