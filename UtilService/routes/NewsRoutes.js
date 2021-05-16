const express=require('express');
const NewsController=require('../controller/NewsController');

const isAuthenticated=require('../middleware/isAuth');

const router=express.Router();

router.get('/news/latest',isAuthenticated,NewsController.getLatestNews);

module.exports=router;