const jwt=require('jsonwebtoken');

module.exports=((req,res,next)=>{
    const authHeader=req.headers.authorization;
    console.log(req.headers)
    const token=authHeader && authHeader.split(' ')[1];
    console.log('in auth service mw');
    if(token==null){
        console.log('in auth service mw');
        res.sendStatus(401);
    } else {
        jwt.verify(token,'secret key',(err,user)=>{
            if(err){
                console.log('got error')
                res.sendStatus(403);
            } else {
                console.log(user+' : user in middleware')
                req.user=user;
                res.sendStatus(200);
            }
        })
    }
})
