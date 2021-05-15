import React, {Component} from 'react';
import axios from 'axios'

import SendEmail from '../email/SendEmail';
import Chatbox from '../chatbox/Chatbox';
import Users from '../users/Users';
import Recon from '../recon/Recon';
import Approvals from '../approvals/Approvals';
import Requests from '../requests/Requests';
import Shop from '../shop/Shop';

import './Main.css';

class Main extends Component{
  state={
    isLoginClicked:true,
    isSignupClicked:false,
    serviceSelected:null,
    totalUsers:0,
    isLoading:false
  }

    onClickHandler=async (event)=>{
      if(event.target.innerText==='Get Users'){
        this.setState({isLoading:true});
        var sessionToken=sessionStorage.getItem('userSessionID');
        var totalUsers= await axios.get('http://localhost:4001/total/users',{ headers: {'Authorization' : 'Bearer '+sessionToken} })
        this.setState({totalUsers:totalUsers.data.total,isLoading:false })
        this.setState({serviceSelected:'Get Users'});
      }else if(event.target.innerText==='Logout'){
        this.props.logOutHandler();
      }else{
        this.setState({serviceSelected:event.target.innerText});
      }
    }


    render(){
      var renderService=null;
      if(this.state.isLoading){
        renderService= (<div>...Loading</div>)
      }else{
        switch (this.state.serviceSelected) {
          case 'Send Email':renderService=(<div><SendEmail/></div>)
            break;
          case 'Get Users': renderService=( <div><Users totalUsers={this.state.totalUsers}/></div>)
            break;
          case 'Reconcile': renderService=(<div><Recon/></div>)
            break;
          case 'Chat Box':  renderService=(<div><Chatbox/></div>)
            break;
          case 'Approvals': renderService=(<div><Approvals/></div>)
            break;
          case 'Requests':  renderService=(<div><Requests/></div>)
            break;
          case 'Shop':      renderService=(<div><Shop/></div>)
            break;      
          default:renderService=(<div><h1>Choose your service</h1></div>)
            break;
        }
      }
      
      return(
        <div className="Main">
          <h1>Professional Services App</h1>
          <button onClick={this.onClickHandler} className="btn btn-primary lgmain_button">Send Email</button>
          <button onClick={this.onClickHandler} className="btn btn-success main_button">Get Users</button>
          <button onClick={this.onClickHandler} className="btn btn-warning main_button">Reconcile</button>
          <button onClick={this.onClickHandler} className="btn btn-danger main_button">Chat Box</button>
          <button onClick={this.onClickHandler} className="btn btn-success main_button">Approvals</button>
          <button onClick={this.onClickHandler} className="btn btn-warning main_button">Requests</button>
          <button onClick={this.onClickHandler} className="btn btn-info main_button">Shop</button>
          <button onClick={this.onClickHandler} className="btn btn-primary main_button">Logout</button>
          {renderService}
        </div>
      )
    }
}

export default Main;