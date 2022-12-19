const Student = require("../models/student");
const { getStudentFromMysql } = require("./mysql");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getStudent = (student_id) => {
    return new Promise((resolve,reject)=>{
        console.log("student_id = ",student_id);
        Student.findOne({_id:student_id}).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        });
    });
}

exports.getStudentFromEmail = (student_id) => {
    return new Promise((resolve,reject)=>{
        console.log("student_id = ",student_id);
        Student.findOne({email:student_id}).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        });
    });
}

exports.addBalance = (amount, student_id) => {
    return new Promise((resolve,reject)=>{
        console.log("student_id = ",student_id);
        console.log("amount = ",amount);

        Student.findByIdAndUpdate(student_id,{$inc:{'referralEarnings':amount,'walletBalance':amount}})
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject(err)
        });
    })
}

exports.getStudentorCreateFromEmail = (email) =>{
    return new Promise((resolve,reject)=>{
        console.log("student_id = ",email);
        Student.findOne({email:email}).then((data)=>{
            if(data!="" && data!=null && data!=undefined && Object.keys(data).length>0)
            resolve(data);
            else
            {
                getStudentFromMysql(email).then((student)=>{
                    Student.create({email:email,studentName:student.studentName,courses:student.courses}).then((newStudent)=>{
                        console.log("newStudent = ",newStudent);
                        resolve(newStudent);
                    })
                })
            }
        }).catch((err)=>{
            reject(err);
        });
    });
}