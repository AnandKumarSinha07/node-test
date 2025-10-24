
const express = require('express');
const route = express.Router();
const { RegisterUser, Login, getProfile, AllUser, UpdateUserApi, checkUser } = require('../controller/register');
const Middleware = require('../middleware/middleware');



route.post('/registerUser', RegisterUser);
route.post('/LoginUser', Login);
route.get("/profile",Middleware,getProfile);
route.get('/allProfile',AllUser);
route.put('/updateProfile',Middleware,UpdateUserApi);

module.exports = route;







