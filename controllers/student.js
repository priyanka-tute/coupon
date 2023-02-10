const Coupon = require("../models/coupon");
const Course = require("../models/course");
const Student = require("../models/student");
const {getOrCreateStudentCoupon, findCoupon} = require("../services/coupon");
const { getStudentFromMysql, getStudentReferralsFromMysqlCoupon, getReferralDataFromMysql } = require("../services/mysql");
const { applyCoupon, getStudentReferrals, getStudentReferralsFromBackupId } = require('../services/referral');
const { getStudent, getStudentFromEmail, getStudentorCreateFromEmail } = require("../services/student");
const { generateUniqueCode, generate } = require("./coupon");

exports.dashboard = async (req,res,student_id) => {
    if(student_id==undefined || student_id==null)
    student_id = req.query.student_id; //here student_id is email
    console.log("student_id = ",student_id);
    // const student = await getStudentorCreateFromEmail(student_id);
    // console.log("student = ",student);
    let coupon = await getOrCreateStudentCoupon(student_id,generate());
// console.log("coupon doc = ",coupon);
coupon = coupon[0];
console.log("coupon doc = ",coupon);
    const student = await getStudentFromMysql(student_id);
    const student_referrals = await getStudentReferralsFromMysqlCoupon(coupon.code);
    // const student_refer = await getReferralDataFromMysql(student_id);
    // console.log("student = ",student);
    // console.log("student_refer = ",student_referrals);

    let dashboard = {};
    dashboard = JSON.parse(JSON.stringify(student));
    // console.log(student_referrals);
    dashboard.code = coupon.code;
    dashboard.walletBalance = coupon.walletBalance;
    // dashboard.enrollers = student_referrals;
    dashboard = {...dashboard, ...student_referrals};
    // dashboard.walletBalance =student_refer[0].walletBalance;
    // dashboard.referralEarnings = student_refer[0].referralEarnings;
    // dashboard.code = student_refer[0].coupon_code;
    if(dashboard.walletBalance==undefined)
        dashboard.walletBalance = dashboard.referralEarnings;
    dashboard.password=undefined;
    // const courses = student.courses;
    // console.log("courses = ",courses);
    // for(let i=0;i<courses.length;i++)
    // {
    //     dashboard.courses[i]= await Course.findById(courses[i]);
    // }

    // const enrollersList = await getStudentReferrals(student_id);
    
    let enrollers = [];
    // let code = await Coupon.findOne({email:student_id});
    // console.log("code= ",code);
    // if(dashboard.code)
    // {
    //     // const enrollersList = await getStudentReferralsFromMysqlCoupon(dashboard.code);
    //     // dashboard.code = code.code;
    //     // for(let i=0;i<enrollersList.length;i++)
    //     // {
    //     //     let enroller = {};
    //     //     // const enrollerStudent = await getStudent(enrollersList[i].user);
    //     //     // const enrollerStudent = await getStudentFromMysql(enrollersList[i].email);

    //     //     // enroller.courses = await getCourseNames(enrollerStudent.courses);
    //     //     enroller.courses = enrollerStudent.courses;
    //     //     // enroller._id = enrollerStudent._id;
    //     //     // enroller.referralAmount = enrollersList[i].amountToReferrer;
    //     //     enroller.studentName = enrollerStudent.studentName;
    //     //     enroller.enrolledDate = enrollersList[i].date_time;
    //     //     enrollers.push(enroller);
    //     // }
    //     dashboard.enrollers = enrollersList;
    // }
    // let code = await Coupon.findOne({student:student_id});
    // else
    // {
    //     //if no code generate code automatically, here then codes can be added without admin as well
    //     // const coupon = new Coupon({student_id_backup:student_id,code:code,dateOfCreation: new Date()});
    //     // coupon.save();
    //     // dashboard.code = coupon.code;
    // }
    
    res.send({success:true,dashboard:dashboard});
}


function getCourseNames(source)
{
    return new Promise(async (resolve,reject)=>{
        dest=[];
        for(let j=0;j<source.length;j++)
        {
            dest.push(await Course.findById(source[j]));
        }
        resolve(dest);
    });
}