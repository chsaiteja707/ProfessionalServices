const logic=async (data)=>{
    var emailsInDb=[];
    var emailsInFile=[];
    data.dbData.forEach(user => {
        emailsInDb.push(user.Email||user[" Email"]);
    });

    data.fileData.forEach(user=>{
        emailsInFile.push(user.Email);
    })
    var recon=0;
    var k='';
    emailsInFile.forEach(email=>{
        if(emailsInDb.indexOf(email)==-1){
            recon++;
            k+=email+'\n';
        }
    })
    return {
        emailText:k,
        emailToSend:'chsaiteja707@gmail.com',
        emailSubject:'Number of fallouts : '+recon
    }
}



module.exports={logic};