const express = require("express");
const route = express.Router();
const ctrl= require('./common')
const common = require('../services/loginCheck');

//path
const authentication = require('./authentication/auth')
const createUser = require('./createUser/createUser')

//routes
route.post('/auth',authentication.auth); 
route.post("/createUser",createUser.register);

//user
route.put('/user/update',ctrl.userUpdate);
route.put('/user/bookTk',ctrl.userBookTk);

//admin
route.post('/admin/cbs',ctrl.adminCbs);
route.put('/admin/ubs',ctrl.adminUbs);
route.get('/admin/rbs',ctrl.adminRbd);
route.delete('/admin/dbs',ctrl.adminDbs)




module.exports = route  