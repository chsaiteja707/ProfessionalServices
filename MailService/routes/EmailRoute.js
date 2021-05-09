const express=require('express');
const EmailController=require('../controller/EmailController');

const isAuthenticated=require('../middleware/isAuth');

const router=express.Router();

router.post('/sendemail',isAuthenticated,EmailController.sendEmail)

module.exports=router;