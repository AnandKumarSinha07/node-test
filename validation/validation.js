const validator = require('validator');

const Validation=({Name,role,email, password})=>{
    if(!validator.isEmail(email)){
        return "Invalid email format";
    }
    
    if(!validator.isStrongPassword(password)){
       return "Password must be strong (8+ chars, mix of upper/lower/symbols/numbers)";
    }

    if(!validator.isAlpha(Name)){
         return "Please Enter string only in Name!!"
    }
    

    if(!validator.isAlpha(role)){
        return "Role is string only"
    }
    return null;
    

}


module.exports=Validation;