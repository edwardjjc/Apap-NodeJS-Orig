var db = require("./db.js");
var bcrypt = require("bcrypt");

const SALT_ROUND=10;

var userSchema={
    usuario:{type: String, 
        maxlength:20,
        minlength:4,
        required: "El nombre de usuario es requerido",
        unique:true},
    password:{
        type:String,
        minlength:20}
}

var user_schema = new db.Schema(userSchema);
var User = db.model("Users", user_schema);
//User.createIndexes({usuario:1},{unique:true});

//Errores
User.OK=0
User.ERR_PWD_NO_COINCIDEN=1;
User.ERR_DB=2;
User.ERR_PWD_CORTO=3;
User.ERR_USR_NO_VALIDO=4;
User.ERR_PWD_NO_VALIDO=5;

//funciones
User.addUser=async (user, pwd, pwd2)=>{
    if (pwd!=pwd2) return User.ERR_PWD_NO_COINCIDEN;
    if (pwd.length<8) return User.ERR_PWD_CORTO;
    let hash=await bcrypt.hash(pwd, SALT_ROUND);
    let newUser=new User({usuario:user, password:hash});
    try{
        await newUser.save(); //persiste
        console.log("registro creado en base");    
        return User.OK;
    }catch(err){
        console.log(err);
        return User.ERR_DB;
    }
}

User.login=async (user, pwd)=>{
    try {
        let u=await User.findOne({usuario:user});
        if (!u) return User.ERR_USR_NO_VALIDO;
        let st=await bcrypt.compare(pwd,u.password);
        console.log("ret: " + st);
        if (st)
            return User.OK;
        else    
            return User.ERR_PWD_NO_VALIDO;
    } catch (error) {
        console.log(err);
        return User.ERR_DB;
    }
    
}



module.exports=User;