// const db = require("./mongo");
// const ObjectId = require("mongodb").ObjectId;
// var coupon;
// db.initialize(process.env.DB_NAME, "coupons", (data) => {
//   console.log("Successfully connected to database...");
//   coupon = data;
// });

const Coupon = require("../models/coupon");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getOrCreateStudentCoupon = (student_id,coupon) => {
  return new Promise((resolve,reject)=>{

  
  console.log("coupon = ",coupon[0]);
   const rec =  Coupon.find(
        { student: student_id}).exec();
    rec.then((data)=>{
     console.log(data,data.length)
      if(data.length==0)
      {
        console.log("in if..");
        Coupon.findOneAndUpdate({student: student_id},coupon,
        {
        new: true,   // return new doc if one is upserted
        upsert: true, // insert the document if it does not exist
        }).exec().then((data2)=>{
          resolve(data2)
        }).catch((err2)=>{
          reject(err2)
        })
      }
      else
      {
        resolve(data)
      }
    }).catch((err)=>{
      reject(err);
    })
  })
}

exports.findCoupon = (coupon) => {
  return new Promise((resolve,reject)=>{
  Coupon.find({code:coupon}).exec().then((data)=> {
    resolve(data);
  }).catch((err)=>{
    reject(err);
  })
})
}