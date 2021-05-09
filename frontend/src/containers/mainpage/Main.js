import React, {Component} from 'react';
import axios from 'axios'
import {Button} from 'react-bootstrap'

import SendEmail from '../email/SendEmail';
import Chatbox from '../chatbox/Chatbox';
import Users from '../users/Users';
import Recon from '../recon/Recon';

import './Main.css';

class Main extends Component{
  state={
    isLoginClicked:true,
    isSignupClicked:false,
    serviceSelected:null,
    totalUsers:0,
    isLoading:false
  }

    onEmailClicked=(event)=>{
      this.setState({serviceSelected:'email'});
    }

    onGetUsers=async (event)=>{
      this.setState({isLoading:true});
      var sessionToken=sessionStorage.getItem('userSessionID');
      var totalUsers= await axios.get('http://localhost:4001/total/users',{ headers: {'Authorization' : 'Bearer '+sessionToken} })
      this.setState({totalUsers:totalUsers.data.total,isLoading:false })
      this.setState({serviceSelected:'getUsers'});

    }

    onReconcile= (event)=>{
      this.setState({serviceSelected:'recon'});
    }

    onChatBox=(event)=>{
      this.setState({serviceSelected:'chatbox'})
    }

    logOutClicked=(event)=>{
      console.log(this.props)
      this.props.logOutHandler();
    }


    render(){
      var renderService=null;
      if(this.state.isLoading){
        renderService= (<div>...Loading</div>)
      }else{
        switch (this.state.serviceSelected) {
          case 'email':
            renderService=(
              <div>
                <SendEmail/>
              </div>
            )
            break;
          case 'getUsers':
            renderService=(
              <div>
                <Users totalUsers={this.state.totalUsers}
                  />
              </div>
            )
            break;
          case 'recon':
            renderService=(
              <div>
                <Recon
                  />
              </div>
            )
            break;
          case 'chatbox':
            renderService=(
              <div>
                <Chatbox/>
              </div>
            )
            break;
          default:
              renderService=(
                <div>
                  <h1>Choose your service</h1>
                </div>
            )
            break;
        }
      }
      
      return(
        <div className="Main">
          <h1>Professional Services App</h1>
          <Button variant="primary" size="lg" onClick={this.onEmailClicked} className="main_button">Send Email</Button>
          <Button variant="success" size="lg" onClick={this.onGetUsers} className="main_button">Get Users</Button>
          <Button variant="warning" size="lg" onClick={this.onReconcile} className="main_button">Reconcile</Button>
          <Button variant="danger" size="lg" onClick={this.onChatBox} className="main_button">Chat Box</Button>
          <Button varient="secondary" size="lg" onClick={this.logOutClicked}>Logout</Button>
          {renderService}
        </div>
      )
    }
}

export default Main;