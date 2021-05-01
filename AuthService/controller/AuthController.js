const jwt=require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const UserLogin=require('../model/Login');

const login=async (req,res,next)=>{
    const userId=req.body.userId;
    const password=req.body.password;
    const getUserFromDb=await UserLogin.findUserByUserId(userId)
    if(!getUserFromDb){
        res.status(404).json({
            message:'user not found with the email id'
        })
    } else {
        // const bcryptCompare=await bcrypt.compare(password,getUserFromDb.password);
        // if(bcryptCompare){

        // }else{

        // }
        if(getUserFromDb.userId===userId&&getUserFromDb.password===password){   
            // const ti=: "10h"}
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

exports.login=login;
