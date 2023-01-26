const { searchLoginUserFromMysql } = require("../services/mysql");
const { dashboard } = require("./student");

exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    searchLoginUserFromMysql(email,password).then((data)=>{
        dashboard(req,res,email);
    }).catch((err)=>{
        res.send({"success":"false"});
    })
}