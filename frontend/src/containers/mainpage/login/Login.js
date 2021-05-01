import axios from 'axios';
import React, {Component} from 'react';
import SendEmail from './email/SendEmail';

// import './Login.css';

class Login extends Component{

    state={
        isAuthenticated:false,
        authenticationFailed:false,
        username:'',
        password:'',
        isAuthenticating:false
    }

    authenticationHandler= async (event)=>{
        console.log('here')
        this.setState({isAuthenticating:true})
        event.preventDefault();
        try {
            const authResponse= await axios.post('http://localhost:4002/login',{userId:this.state.username,password:this.state.password})
            if(authResponse.status===200){
                sessionStorage.setItem("userSesssionID",authResponse.data.token);
                this.setState({isAuthenticated:true,authenticationFailed:false})
            }else{
                console.log('i am failed here')
                this.setState({authenticationFailed:true})
                sessionStorage.removeItem("userSessionId")
            }
        } catch (error) {
            var k=error.message
            console.log(typeof(k))
            this.setState({authenticationFailed:true})
        }
        this.setState({isAuthenticating:false})       
    }

    userNameHandler=(event)=>{
        this.setState({username:event.target.value})
    }

    userPasswordHandler=(event)=>{
        this.setState({password:event.target.value})
    }

    render(){
        var appHome=null;
        var form=(
            <form>
                <label>User ID</label><br/>
                <input type="text" name="userId" onChange={this.userNameHandler}/><br/>
                <label>Password</label><br/>
                <input type="text" name="password" onChange={this.userPasswordHandler}/><br/><br/>
                <button onClick={this.authenticationHandler}>Submit</button>
                <button>Go back</button>
            </form>
        )
        if(this.state.isAuthenticating){
           appHome=( 
                <div>
                    Authenticating....
                </div>
            )
        }else if(this.state.authenticationFailed){
            appHome=(
                <div>
                    <p className="failure_block">**Please enter valid credentials**</p>
                    {form}
                </div> 
            )
        }
        else if(this.state.isAuthenticated){
            appHome=(
                <div>
                    <SendEmail successMessage='You are authenticated to access professional services'/>
                </div>

            )
        }else{
            appHome=(
                <div>
                    {form}
                </div> 
            )
        }
        return(
            <div>
                {appHome}   
            </div>
        )
    }
}

export default Login;