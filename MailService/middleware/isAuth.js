const axios=require('axios');

const isAuth=async (req,res,next)=>{
    console.log()
    try {
        const isAuthenticated=await axios.post('http://localhost:4002/isAuthenticated',{},
            { headers: {"Authorization" : req.headers.authorization} }
        )
        next();
    } catch (error) {
        res.send(400)
    }
    console.log('in is auth in mail mw')
}

module.exports=isAuth;
