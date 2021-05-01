// const express=require('express');
const router=require('express').Router();

const DBAndCSVRecon=require('../controller/DBAndCSVRecon');

router.get('/',DBAndCSVRecon.getData);

module.exports=router;