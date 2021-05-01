import React,{Component} from 'react';
import axios from 'axios';

import './SendEmail.css';
import Spinner from '../../../../components/UI/Spinner';

class SendEmail extends  Component{

    state={
        isSending:false,
        emailSubject:'',
        emailToSend:'',
        emailText:'',
        failedToSendEmail:false,
        emailSent:false,
    }

    showInitialPara=()=>{
        var initialPara=document.getElementById('initial__para')
        initialPara.style.display='block';
        initialPara.className='success_block'
        initialPara.innerText='you were successfully loggedin';
    }

    hideInitialPara=()=>{
        var initialPara=document.getElementById('initial__para')
        initialPara.style.display='none';
    }

    componentDidMount(){
        this.showInitialPara();
    }

    recipientHandler=(event)=>{
        this.setState({emailToSend:event.target.value});
    }

    subjectHandler=(event)=>{
        this.setState({emailSubject:event.target.value})
    }

    contentHandler=(event)=>{
        this.setState({emailText:event.target.value})
    }

    sendEmailHandler= async(event)=>{
        this.setState({isSending:true})
        event.preventDefault();
        var data={
            emailText:this.state.emailText,
            emailToSend:this.state.emailToSend,
            emailSubject:this.state.emailSubject
        }
        this.setState({isSending:true})
        var responseFromMailService;
        try {
            responseFromMailService=await axios.post('http://localhost:5001/sendemail',data,
                { headers: {"Authorization" : 'Bearer '+sessionStorage.getItem('userSesssionID')} })
            if(responseFromMailService.status>=200){
                console.log(responseFromMailService.data.sentTo);
                this.setState({emailSent:'true'})
                document.getElementById('emailRecipientBlock').innerText=`**Your email was sent successfully to ${responseFromMailService.data.sentTo}**`
            }
        } catch (error) {
            console.log('failed')
            this.setState({failedToSendEmail:true,emailSent:false});
        }
        this.hideInitialPara();
        this.setState({isSending:false})
        this.setState({emailSubject:'',emailText:'',emailToSend:''})
        
    }
    
    render(){
        var display=null;
        var formData=null;
        if(this.state.isSending){
            formData=<Spinner/>
        }else{
            formData=(
                <div>
                    <label>Recipeint Email</label><br/>
                    <input  type="email" 
                            onChange={this.recipientHandler}
                            value={this.state.emailToSend}/><br/>
                    <label>Subject</label><br/>
                    <input  type="text"  
                            onChange={this.subjectHandler}
                            value={this.state.emailSubject}/><br/>
                    <label> Content </label><br/>
                    <textarea   onChange={this.contentHandler}
                                value={this.state.emailText}
                                className="subject__box"></textarea><br/>
                    <button onClick={this.sendEmailHandler}>Send Email</button>
                </div>
            )
        }
        if(this.state.emailSent){
            display=(<div>
                <p className="success_block" id="emailRecipientBlock"></p>
            </div>)
        }
        else if(this.state.failedToSendEmail){
            display=(<div>
                <p className="failure_block">Email task failed, please use appropriate email ID</p>
            </div>)
        }
        return(
            <div id='formData'>
                <p id="initial__para"></p>
                {display}
                {formData}
            </div>
        )
    }
}

export default SendEmail;