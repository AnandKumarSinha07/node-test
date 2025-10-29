
const express = require('express');
const route = express.Router();
const { Register, Login,getMyProfile, AllUser, UpdateUserApi } = require('../controller/register');
const Middleware = require('../middleware/middleware');



route.post('/register', Register);
route.post('/LoginUser', Login);
route.get("/myProfile",Middleware,getMyProfile);
route.get('/allProfile',AllUser);
route.put('/updateProfile',Middleware,UpdateUserApi);

module.exports = route;







