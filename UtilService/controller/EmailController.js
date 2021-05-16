const nodeMailer=require('nodemailer');

const sendEmail = async (req,res,next)=>{
    //ensure body parser is there inorder to fetch the rest data properly
    var mailTransport=nodeMailer.createTransport({
        service:process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL_ID,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    var mailDetails={
        from:process.env.EMAIL_FROM,
        to:req.body.emailToSend,
        subject:req.body.emailSubject,
        text:req.body.emailText
    }

    try {
        await mailTransport.sendMail(mailDetails,(err,data)=>{
            if(err){
                console.log('402')
                res.status('402').send('some error in middleware')
            }else{
                console.log('200')
                res.status('200').send({sentTo:req.body.emailToSend,message:'email sent successfully'});
            }
        })
    } catch (error) {
        console.log('403')
        res.status('403'),send('some internal error');
    }
    

}

exports.sendEmail=sendEmail; //adding objects here is adding object to module.exports