import axios from 'axios';
import React, {Component} from 'react';

// import './Login.css';

class Login extends Component{

    state={
        isAuthenticating:false,
        forgotPasswordBox:false,
        passwordForgotUser:'',
        otpValidation:false,
        otp:'',
        newPassword:'',
        newPasswordRenter:'',
        errorMsgForOTPValidation:false,
    }

    authenticationHandler= async (event)=>{
        console.log('here')
        this.setState({isAuthenticating:true})
        event.preventDefault();
        try {
            const authResponse= await axios.post('http://localhost:4002/login',{userId:this.state.username,password:this.state.password})
            if(authResponse.status===200){
                sessionStorage.setItem("userSessionID",authResponse.data.token);
                this.setState({isAuthenticated:true,authenticationFailed:false})
                this.props.setService('mainpage') 
            }else{
                console.log('i am failed here')
                this.setState({authenticationFailed:true})
                sessionStorage.removeItem("userSessionId")
                this.props.setService('authFailed') 
            }
        } catch (error) {
            var k=error.message
            console.log(typeof(k))
            this.setState({authenticationFailed:true})
            this.props.setService('authFailed') 
        }
        this.setState({isAuthenticating:false})  
            
    }

    userNameHandler=(event)=>{
        this.setState({username:event.target.value})
    }

    userPasswordHandler=(event)=>{
        this.setState({password:event.target.value})
    }

    forgetPwdHandler=async (event)=>{
        event.preventDefault();
        this.setState({forgotPasswordBox:true,otpValidation:false})
    }

    submitPasswordForgotHandler=async(event)=>{
        event.preventDefault();
        console.log(this.state.passwordForgotUser);
        try {
            const otpProcessor=await axios.post('http://localhost:4002/user/forgotPassword',{userId:this.state.passwordForgotUser})
        } catch (error) {
            console.log(error);
            
        }
        
        this.setState({forgotPasswordBox:false,otpValidation:true})
    }

    submitNewPassword=async(event)=>{
        event.preventDefault();
        var data={
            newPassword:this.state.newPassword,
            otp:this.state.otp
        }
        console.log(data);
    }

    forgotPasswordUser=(event)=>{
        this.setState({passwordForgotUser:event.target.value})
    }

    otpHandler=(event)=>{
        this.setState({otp:event.target.value});
    }

    newPasswordEnterHandler=(event)=>{
        this.setState({newPassword:event.target.value});
    }

    newPasswordReEnterHandler=(event)=>{
        this.setState({newPasswordRenter:event.target.value});
    }

    otpValidator=async (event)=>{
        event.preventDefault();
        console.log('validator');
        try {
            const validation=await axios.post('http://localhost:4002/user/otpValidator',{userId:this.state.passwordForgotUser,otpRecieved:this.state.otp,password:this.state.newPassword});
            if(validation.data.valid){
                console.log('valid from fe');
                this.setState({forgotPasswordBox:false,otpValidation:false,errorMsgForOTPValidation:false})
            }else{
                this.setState({forgotPasswordBox:false,otpValidation:true,errorMsgForOTPValidation:true})
            }
        } catch (error) {
            this.setState({forgotPasswordBox:false,otpValidation:true,errorMsgForOTPValidation:true})
        }
        
    }



    render(){
        var display=null;
        var errorMsg=this.state.errorMsgForOTPValidation?<p style={{color:'red'}}>***Wrong OTP***</p>:null
        if(this.state.isAuthenticating){
            return <div>Loading...</div>
        } else if(this.state.forgotPasswordBox){
            display=(
                <form>
                    <label>Registered Email ID</label><br/>
                    <input type="text" value={this.state.passwordForgotUser} onChange={this.forgotPasswordUser}/><br/>
                    <button className="btn btn-danger btn-sm" onClick={this.submitPasswordForgotHandler}>Submit</button>
                </form>
            )
        }  else if(this.state.otpValidation){
            display=(
                <form>
                    {errorMsg}
                    <label>OTP</label><br/>
                    <input type="text" value={this.state.otp} onChange={this.otpHandler}/><br/>
                    <label>New Password</label><br/>
                    <input type="text" value={this.state.newPassword} onChange={this.newPasswordEnterHandler}/><br/>
                    <label>Re Enter New Password</label><br/>
                    <input type="text" onChange={this.newPasswordReEnterHandler}/><br/>
                    <button className="btn btn-danger btn-sm" onClick={this.otpValidator}>Submit</button>
                </form>
            )
        }
        
        else{
            display=(
                <form>
                    <label>User ID</label><br/>
                    <input type="text" onChange={this.userNameHandler}/><br/>
                    <label>Password</label><br/>
                    <input type="text" onChange={this.userPasswordHandler}/><br/><br/>
                    <button className="btn btn-warning btn-sm" onClick={this.authenticationHandler}>Submit</button>
                    <button className="btn btn-danger btn-sm" onClick={this.forgetPwdHandler}>Forgot Password</button>
                </form>
            )
        }
        
        return(
            <div>
                {display}
            </div>
        )
    }
}

export default Login;