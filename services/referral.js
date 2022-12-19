const Referral = require("../models/referral");
const ObjectId = require("mongoose").Types.ObjectId;

exports.applyCoupon = (couponData,user) => {
    return new Promise((resolve,reject)=>{   
        console.log(couponData,"\n",user);
    const referral = new Referral({referrer_email:couponData.student_email,user_email:user_email,code:couponData.code,dateOfUse:new Date(),amountToReferrer:couponData.amountToReferrer,amountToUser:couponData.amountToUser})
    referral.save().then((data)=>{
        console.log(data);
        resolve(data)
    }).catch((err)=>{
        console.log(err)
        reject(err)
    })
})
}


exports.getStudentReferrals = (student_id) => {
    return new Promise((resolve,reject) => {
        console.log("Student_id = ",student_id);
        Referral.find({referrer_email:student_id}).then((data)=>{
            resolve(data);
        }).catch((err)=>
        {
            reject(err);
        })
    });
}

// exports.getStudentReferralsFromBackupId = (student_id) => {
//     return new Promise((resolve,reject) => {
//         console.log("Student_id_backup = ",student_id);
//         Referral.find({referrer_id_backup:student_id}).then((data)=>{
//             resolve(data);
//         }).catch((err)=>
//         {
//             reject(err);
//         })
//     });
// }