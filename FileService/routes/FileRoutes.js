const express=require('express');

const fileController=require('../controller/FileController');

const router=express.Router();

router.get('/',fileController.getFileData);

module.exports=router;