// const express=require('express');
const router=require('express').Router();

const DBAndCSVRecon=require('../controller/DBAndCSVRecon');
const isAuthenticated=require('../middleware/isAuth');

router.get('/',DBAndCSVRecon.getData);

router.post('/external',isAuthenticated,DBAndCSVRecon.clientRecon);

module.exports=router;