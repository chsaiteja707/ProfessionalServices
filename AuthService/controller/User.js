const bcrypt=require('bcryptjs');
const User=require('../model/User');
const Login=require('../model/Login');

const createUser=async (req,res,next)=>{
    try {
        const hashedPassword=await bcrypt.hash(req.body.user.password,12);
        req.body.user.password=hashedPassword;
        const userCreate=await User.createUser(req.body.user);
        const authUser={password:req.body.user.password,userId:req.body.user.email};
        const userCreateInAuthDB=await Login.createUser(authUser);
        res.status(200).json({username:req.body.user.email})
    } catch (error) {
        console.log(error);
    }
    
}



exports.createUser=createUser;