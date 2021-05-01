const express=require('express');

const router=express.Router();

const authController=require('../controller/AuthController');
const isAuthenticated=require('../middleware/isAuth');

router.post('/login',authController.login);

router.post('/isAuthenticated',isAuthenticated)

module.exports=router;