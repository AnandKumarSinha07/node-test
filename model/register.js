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
        minLength:8,
    },
    profilePic:{
        type:String,
        required:true,
    },
    role:{
        type:String, 
        enum:['admin','user'],
    }
},{timestamps:true})

const registerModel=new mongoose.model("Register",RegisterUser);
module.exports=registerModel;