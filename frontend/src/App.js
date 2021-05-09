
import React,{ Component } from 'react';
import {Button} from 'react-bootstrap';

import Login from './containers/login/Login'
import Signup from './containers/signup/SignUp';
import Mainpage from './containers/mainpage/Main';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

class App extends Component{
  state={
    serviceSelected:''
    
  }

  loginHandler= async (event)=>{
    this.setState({serviceSelected:'login'})
  }

  signUpHandler=(event)=>{
    this.setState({serviceSelected:'signup'})
  }

  setService=(serviceName)=>{
    this.setState({serviceSelected:serviceName})
  }

  verifyToken=async()=>{
    try {
      var sessionToken=sessionStorage.getItem('userSessionID');
      console.log(sessionToken);
      var authStatus=await axios.post('http://localhost:4002/isAuthenticated',{},
        { headers: {"Authorization" : "Bearer "+sessionToken} }
      )
      console.log(authStatus);
      this.setState({serviceSelected:'mainpage'})
    } catch (error) {
      this.setState({serviceSelected:'login'})
    }
  }

  logOutHandler=()=>{
    this.setState({isAuthenticated:false,serviceSelected:'login'});
    sessionStorage.setItem('userSessionID','');
  }

  componentDidMount=async()=>{
    this.verifyToken();
  }

  render(){
    var renderService=null;
    var buttons=(
      <div>
         <Button variant="primary" 
                  onClick={this.loginHandler}
                  className="principal-btn">Login</Button>
          <Button variant="success" 
                  onClick={this.signUpHandler}
                  className="principal-btn">Signup</Button>
      </div>
    )
      switch (this.state.serviceSelected) {
        case 'login':
          renderService=(
            <div>
              <h1>Choose your service</h1>
              {buttons}
              <Login setService={this.setService.bind(this)}/>
            </div>
          )
          break;
        case 'signup':
          renderService=(
            <div>
              <h1>Choose your service</h1>
              {buttons}
              <Signup/>
            </div>
          )
          break;
        case 'authFailed':
          renderService=(
            <div>
              <h1>Choose your service</h1>
              {buttons}
              <p className="error_class">***Login failed***</p> 
              <Login setService={this.setService.bind(this)}/>
            </div>
          )
          break;
        case 'mainpage':
          renderService=(
            <div>
              <Mainpage logOutHandler={this.logOutHandler.bind(this)}/>
            </div>
          )
          break;
        default:
            renderService=(
              <div>
                <h1>Choose your service</h1>
                {buttons}
              </div>
          )
          break;
      }
      return(
        <div>
          {renderService}
        </div>
      )
  }
}

export default App;
