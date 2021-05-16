const axios=require('axios');

exports.getLatestNews=async(req,res,next)=>{
    try {
        const latestHeadlinesData=await axios.get('https://newsapi.org/v2/everything?q=india',{ headers: {"Authorization" : process.env.NEWSAPI_KEY} })
        res.status(200).send({totalItems:latestHeadlinesData.data.totalResults,articles:latestHeadlinesData.data.articles});
    } catch (error) {
        res.status(404).send({error:error});
    }
        
    
}