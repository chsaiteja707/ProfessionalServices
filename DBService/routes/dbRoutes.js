const express=require('express');

const userController=require('../controller/user');
const isAuthenticated=require('../middleware/isAuth');

const router=express.Router();

router.get('/',userController.getData);

router.get('/users',isAuthenticated,userController.getUsers);

router.get('/total/users',isAuthenticated,userController.getTotalUsers);

router.get('/users/:limit/:page',isAuthenticated,userController.getPaginatedData)

router.post('/user',isAuthenticated,userController.addUser)

router.put('/user',isAuthenticated,userController.editUser)

module.exports=router;