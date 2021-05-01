const User=require('../model/User')
exports.getData=(req,res,next)=>{
    User.getUsers()
    .then((results)=>{
        res.send(results);
    })
    .catch(err=>{
        console.log(err);
    })
}