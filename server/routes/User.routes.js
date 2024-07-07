const express = require('express');
const router = express.Router();

const UserController = require('../controller/User.controller');

router.post('/loginuser', UserController.LoginUser);
router.post('/createuser', UserController.CreateUser);
router.get('/users', UserController.ListUsers); 
router.put('/users/:id', UserController.EditUser);
router.delete('/users/:id', UserController.DeleteUser); 

module.exports = router;