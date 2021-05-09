const axios=require('axios');

const fetchDataFromURL= async()=>{
    var dbData, fileData;
    try {
        dbData=await axios.get('http://localhost:4001/');
        dbData=dbData.data;
        
        fileData=await axios.get('http://localhost:4000/');
        fileData=fileData.data;
        console.log(fileData)
        var data={
            dbData:dbData,
            fileData:fileData
        }
        return data;
    } catch (error) {
        console.log(error)
    }
    
}

const fetchDBData= async()=>{
    var dbData;
    try{
        dbData=await axios.get('http://localhost:4001/');
        dbData=dbData.data;
        return dbData;
    } catch(err){
        console.log(err)
    }
}

module.exports={fetchDataFromURL,fetchDBData};