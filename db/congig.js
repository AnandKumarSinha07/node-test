const mongoose=require('mongoose')
require('dotenv').config()


const dbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Backend Connected succesfully!!")
    } catch (error) {
        console.log("Error in the databaseConnection",dbConnect);
    }
}

module.exports=dbConnect;