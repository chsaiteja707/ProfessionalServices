import axios from 'axios';
import React, {Component} from 'react';

// import './Login.css';

class Login extends Component{

    state={
        isAuthenticating:false
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

    render(){
        var display=null;
        if(this.state.isAuthenticating){
            return <div>Loading...</div>
        } else{
            display=(
                <form>
                    <label>User ID</label><br/>
                    <input type="text" name="userId" onChange={this.userNameHandler}/><br/>
                    <label>Password</label><br/>
                    <input type="text" name="password" onChange={this.userPasswordHandler}/><br/><br/>
                    <button className="btn btn-warning" onClick={this.authenticationHandler}>Submit</button>
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