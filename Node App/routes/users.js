var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.post('/login', userController.loginUser);
router.get('/checkusername/:username', userController.checkUsername);
router.get('/checkemail/:email', userController.checkEmail);
module.exports = router;
