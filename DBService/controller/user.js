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

exports.getUsers=(req,res,next)=>{
    User.getUsersToFrontend()
    .then((results)=>{
        res.send(results);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.addUser=(req,res,next)=>{
    var user={
        "First Name":req.body.firstname,
        "Last Name":req.body.lastname,
        "Email":req.body.email
    }
    User.addUser(user);
}

exports.editUser=(req,res,next)=>{
    var user={
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        email:req.body.email
    }
    User.updateUser(user)
    .then(result=>{
        result=result.result
        console.log(result);
        if(result.n===0){
            res.status('404').send('no user found to updated')
        }else if(result.n>0&&result.nModified===0){
            res.status('205').send('no changes done')
        }else{
            res.status('200').send(user.email+ ' : is updated')
        }
    })
    .catch(err=>{
        console.log(err);
    })
}