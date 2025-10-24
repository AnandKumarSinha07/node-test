const jwt = require('jsonwebtoken');
const registerModel = require('../model/register');

const Middleware=async(req,res,next)=>{
    console.log(req.cookies);
    const {token}=req.cookies;
    if(!token){
        return res.status(404).json({
            msg:`Token Not Generated!!`
        })
    }
    const verifyToken=jwt.verify(token,"Anand123@")
    if(!verifyToken){
        return res.status(404).json({
            msg:`Token Not verified!!`
        })
    }
    console.log("token is",token);
    console.log("verifyToken is",verifyToken);
    const decodedId=verifyToken.id
    if(!decodedId){
        return res.status(404).json({
           msg:`Decoded Id Not found`
        })
    }
    console.log("decodedId",decodedId);
    const findUser=await registerModel.findById(decodedId);
    console.log("user Find in the db",findUser);
    req.user=findUser
    next();
    
}
module.exports=Middleware;