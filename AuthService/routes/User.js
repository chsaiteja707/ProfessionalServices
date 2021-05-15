const express=require('express');
const userController=require('../controller/User');

const router=express.Router();

router.post('/user',userController.createUser);

module.exports=router;