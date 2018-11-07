var express=require("express");
var User=require("../Models/user.js")

var router=express.Router();

router.route("/login").get((req,res)=>{
    res.render("login");
}).post(async (req,res)=>{
    let st=await User.login(req.body.usuario, req.body.pwd);
    console.log(st);
    if (st==User.OK){
        res.render("usrManager");
    } else {
        res.send("LOGIN NO EXITOSO");
    }
});



module.exports = router;