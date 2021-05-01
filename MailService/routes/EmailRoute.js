const express=require('express');
const EmailController=require('../controller/EmailController');

const isAuth=require('../middleware/isAuth');

const router=express.Router();

router.post('/sendemail',isAuth,EmailController.sendEmail)

module.exports=router;