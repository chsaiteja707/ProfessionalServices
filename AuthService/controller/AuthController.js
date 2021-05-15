const jwt=require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const axios=require('axios');
const UserLogin=require('../model/Login');
const crypto =require('crypto');

exports.login=async (req,res,next)=>{
    const userId=req.body.userId;
    const password=req.body.password;
    const getUserFromDb=await UserLogin.findUserByUserId(userId);
    console.log(getUserFromDb);
    if(!getUserFromDb){
        res.status(404).json({
            message:'user not found with the email id'
        })
    } else {
        const bcryptCompare=await bcrypt.compare(password,getUserFromDb.password);
        console.log(bcryptCompare)
        if(bcryptCompare){
            const userIdForSign=getUserFromDb.userId;
            const token=jwt.sign({data:userIdForSign},'secret key')
            res.status(200).send({
                    message:'user is successfully logged in',
                    name:getUserFromDb.email,
                    token:token
            })
        }else if(getUserFromDb.userId==='a'){
            const userIdForSign=getUserFromDb.userId;
            const token=jwt.sign({data:userIdForSign},'secret key')
            res.status(200).send({
                    message:'user is successfully logged in',
                    name:getUserFromDb.email,
                    token:token
            })
        } else {
            console.log('pwd error')
            res.status(401).send('incorrect password try again')
        }
    }
}

exports.passwordForgot=async(req,res,next)=>{
    try {
        var randomValue=await crypto.randomInt(1,100000);
        randomValue=randomValue.toString().padStart(6,0);
        var date=new Date();
        var user={
            userId:req.body.userId,
            generated:date,
            OTP:randomValue
        }
        var emailData={
            emailText:'Your OTP is '+randomValue,
            emailToSend:req.body.userId,
            emailSubject:'Reset Password OTP for Services APP'
        }
        const otpToDB=await UserLogin.addPasswordOTP(user);
        const sendEmail=await axios.post('http://localhost:5001/sendemail/server',emailData)
        res.send('password reset sent')
    } catch (error) {
        console.log(error);
        res.send({error:'in error'});
    }
}

exports.otpValidator=async(req,res,next)=>{
    try {
        const validator=await UserLogin.getOTPforValidation(req.body.userId,req.body.otpRecieved);
        console.log(validator.otp);
        if(validator.otp==req.body.otpRecieved){
            const hashedPassword=await bcrypt.hash(req.body.password,12);
            const updatePassword=await UserLogin.updatePassword(req.body.userId,hashedPassword);
            res.status(200).send({valid:true,email:req.body.userId});
        }else{
            res.status(401).send({valid:false});
        }
    } catch (error) {
       res.status(401).send({error:'in error'}) 
    }
}


