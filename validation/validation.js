const validator = require('validator');

const Validation=({Name,email,password,profilePic,role})=>{
    if(validator.isEmail(email)){
        throw new Error("Email Proper Formaty");
    }
    if(validator.isAlpha(Name)){
       throw new Error("Please Enter valid numeric chracter");
    }
    if(validator.isStrongPassword(password)){
        throw new Error("password is not valid");
    }

    if(validator.isAlpha(Name)){
       throw new Error("Please Enter valid numeric chracter");
    }
}


module.exports=Validation;