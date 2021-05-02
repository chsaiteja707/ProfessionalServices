const express=require('express');

const userController=require('../controller/user');

const router=express.Router();

router.get('/',userController.getData);

router.get('/users',userController.getUsers);

router.post('/user',userController.addUser)

router.put('/user',userController.editUser)

module.exports=router;