const axios=require('axios');
const reconLogic=require('../util/reconlogic');
const fileDbData=require('../api/FileDBData');

exports.getData=async (req,res,next)=>{
    const fetchedDataFromURL=await fileDbData.fetchDataFromURL()
    const reconData=await reconLogic.logic(fetchedDataFromURL)
    const emailServiceResponse=await axios.post('http://localhost:5001/sendemail',reconData)
    await res.send({response:emailServiceResponse.data,status:emailServiceResponse.status});
}

exports.clientRecon=async (req,res,next)=>{
    console.log(req.body);
    console.log('hello external')
    const fetchDBData=await fileDbData.fetchDBData()
    const reconData={dbData:fetchDBData,fileData:req.body};
    const validationResult=await reconLogic.logic(reconData);
    res.send(validationResult);
    // res.sendStatus(200);
}

