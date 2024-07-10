const express = require('express');
const router = express.Router();
const UserController = require('../controller/User.controller');

// Create User - POST /api/createuser
router.post('/createuser', UserController.CreateUser);

// Login User - POST /api/loginuser
router.post('/loginuser', UserController.LoginUser);

// List Users - GET /api/users
router.get('/users', UserController.ListUsers);

// Edit User - PUT /api/users/:id
router.put('/users/:id', UserController.EditUser);

// Delete User - DELETE /api/users/:id
router.delete('/users/:id', UserController.DeleteUser);

module.exports = router;
