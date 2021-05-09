const axios=require('axios');

const isAuth=async (req,res,next)=>{
    console.log(req.headers)
    try {
        const isAuthenticated=await axios.post('http://localhost:4002/isAuthenticated',{},
            { headers: {"Authorization" : req.headers.authorization} }
        )
        next();
    } catch (error) {
        console.log('failed in db')
        res.send(400)
    }
}

module.exports=isAuth;
