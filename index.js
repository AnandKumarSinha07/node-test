const express = require('express');
const dbConnect = require('./db/congig');
const route = require('./routes/routes');
const cookieParser = require('cookie-parser');


const app=express();
require('dotenv').config()

dbConnect();
app.use(express.json());
app.use(cookieParser())
app.use('/api',route);




const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`App is running on the port ${port}`)
});


