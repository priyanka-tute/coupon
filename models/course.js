const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema({
    course_id_backup:Number,
 name:String,
});

const Course = mongoose.model('Course',CourseSchema);
module.exports = Course;