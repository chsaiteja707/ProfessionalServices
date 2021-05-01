const axios=require('axios');

const fetchDataFromURL= async()=>{
    var dbData, fileData;
    dbData=await axios.get('http://localhost:3000/');
    dbData=dbData.data;
    fileData=await axios.get('http://localhost:4000/');
    fileData=fileData.data;
    var data={
        dbData:dbData,
        fileData:fileData
    }
    return data;
}

module.exports={fetchDataFromURL};