var voucher_codes = require('voucher-code-generator');
const {getOrCreateStudentCoupon, findCoupon} = require("../services/coupon");
const { applyCoupon } = require('../services/referral');
const { addBalance } = require('../services/student');

exports.generateUniqueCode = (req,res) => {

    const student_id = req.query.student_id;
    console.log(student_id);
    var coupon = {
        code:generate()[0]
    }
    if(req.query.amountToReferrer)
    {
         coupon.amountToReferer=req.query.amountToReferrer;
    }

    if(req.query.amountToUser)
    {
         coupon.amountToUser=req.query.amountToUser;
    }
    getOrCreateStudentCoupon(student_id,coupon).then((data)=>{

   
    console.log(data);
    res.send({"success":true,"data":data})
}).catch((err)=>{
    if(err.codeName=="DuplicateKey")
    {
        console.log("Regenerating...")
        this.generateUniqueCode(req,res)
    }
    else {
    res.send({"success":false,"error":err})
    }
})
}

exports.verifyCoupon = (req,res) => {
    const coupon = req.query.coupon;
    findCoupon(coupon).then((data)=>{
        if(data.length>0)
        {
            res.send({success:true,data:data})
        }
        else
        {
            res.send({success:false,error:"Coupon does not exist"});
        }
    }).catch((err)=>{
        res.send({success:false,error:err});  
    })

}

exports.useCoupon = (req,res) => {
    const coupon = req.query.coupon;
    // const user = req.query.user;
    // findCoupon(coupon).then((data)=>{
    //     if(data.length>0)
    //     {
    //         applyCoupon(data[0],user).then((data2)=>{
    //             console.log("Coupon applied",data2);
    //             addBalance(data[0].amountToReferrer,data[0].student).then((data3)=>{
    //                 console.log("Balance added",data3);
    //                 res.send({success:true,data:data2})
    //             }).catch((err)=>{
    //                 console.log("Could not add balance",err);
    //                 res.send({success:false,error:"Could not add Balance"})
    //             })
    //         }).catch((err)=>{
    //             console.log("Unable to apply coupon",err);
    //     res.send({success:false,error:err});  
    // })
    //         // res.send({success:true,data:data})
    //     }
    //     else
    //     {
    //         res.send({success:false,error:"Coupon does not exist"});
    //     }
    // }).catch((err)=>{
    //     res.send({success:false,error:err});  
    // })
    applyCouponFromMysql(coupon).then((data)=>{
        res.send({success:true,data:data})
    }).catch((err)=>{
            res.send({success:false,error:err});  
    });
}
exports.generate=() =>
{
    return voucher_codes.generate({
        length: 6,
        count: 1,    });
}

function generate()
{
    return voucher_codes.generate({
        length: 6,
        count: 1,    });
}