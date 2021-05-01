//for some reason below method is gettig failed so always go for the uncommented approach
    // const emailServiceResposnse=await axios({
    //     method:'POST',
    //     url:'http://localhost:5001/',
    //     reconData
    // })
    //below is uncommented approach
    const emailServiceResposnse=await axios.post('http://localhost:5001/sendemail',reconData)