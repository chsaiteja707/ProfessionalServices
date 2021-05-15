import React,{Component} from 'react';
import axios from 'axios';

import { Button, Form, Row, Col} from 'react-bootstrap';
import './SendEmail.css';


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
                { headers: {"Authorization" : 'Bearer '+sessionStorage.getItem('userSessionID')} })
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
            formData=<div>Loading...</div>
        }else{
            formData=(
                <div>
                <Form>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                        To  
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="email" 
                                    placeholder="Email" 
                                    onChange={this.recipientHandler} 
                                    value={this.state.emailToSend}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                        Subject
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="password" 
                                    placeholder="Subject" 
                                    onChange={this.subjectHandler} 
                                    value={this.state.emailSubject}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>
                        Body
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control as="textarea" 
                                    rows={3}  
                                    placeholder="Body" 
                                    onChange={this.contentHandler} 
                                    value={this.state.emailText}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                        <Button variant="danger" 
                                onClick={this.sendEmailHandler}>Send</Button>
                        </Col>
                    </Form.Group>
                </Form>
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