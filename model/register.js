const mongoose=require('mongoose')

const RegisterUser=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:8,
        max:12,
    },
    profilePic:{
        type:String,
        required:true,
    },
    role:{
        type:String,    
    }
},{timestamps:true})

const registerModel=new mongoose.model("Register",RegisterUser);
module.exports=registerModel;