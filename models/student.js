const mongoose = require("mongoose");
const Course = require("./course");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const StudentSchema = new Schema({
 studentName:String,
 walletBalance:{default:0,type:Number},
 referralEarnings:{default:0,type:Number},
 courses: Array,
 email:String,
});

const Student = mongoose.model('Student',StudentSchema);
module.exports = Student;