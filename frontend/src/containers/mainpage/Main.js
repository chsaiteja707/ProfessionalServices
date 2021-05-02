import React, {Component} from 'react';
// import {Route, NavLink, Switch, BrowserRouter} from 'react-router-dom';

import SendEmail from './login/email/SendEmail';
// import Login from './login/Login';
// import Signup from './signup/SignUp';
import './Main.css';
// import Signup from './signup/SignUp';
import Users from './login/users/Users'

class Main extends Component{
  state={
    isLoginClicked:true,
    isSignupClicked:false,
    serviceSelected:null
  }

    // onLoginClickedHandler=(event)=>{
    //   console.log('login clicked');
    //   this.setState({isLoginClicked:true,isSignupClicked:false})
    // }

    // onSignUpClickedHandler=(event)=>{
    //   console.log('signup clicked')
    //   this.setState({isLoginClicked:false,isSignupClicked:true})
    // }

    onEmailClicked=(event)=>{
      this.setState({serviceSelected:'email'});
    }

    onGetUsers=(event)=>{
      this.setState({serviceSelected:'getUsers'});
    }


    render(){
      // var loginOrSignup=null;
      // if(this.state.isLoginClicked){
      //   loginOrSignup=(
      //     <div>
      //       <Login/>
      //     </div>
      //   )
      // }else{
      //   loginOrSignup=(
      //     <div>
      //       <Signup/>
      //     </div>
      //   )
      // }
      var renderService=null;
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
              <Users/>
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

      return(
        <div className="Main">
          <h1>Professional Services App</h1>
          {/* <button onClick={this.onLoginClickedHandler}>Login</button>
          <button onClick={this.onSignUpClickedHandler}>Signup</button> */}
          {/* {loginOrSignup} */}
          <button onClick={this.onEmailClicked}>Send Email</button>
          <button onClick={this.onGetUsers}>Get Users</button>
          {renderService}
        </div>
      )

      //   return (
    //     <div className="Main">
    //       <BrowserRouter>
    //         <header>
    //               <nav>
    //                   <ul>
    //                       <li><NavLink 
    //                           to="/email/"
    //                           exact
    //                           >Email</NavLink></li>
    //                       <li><NavLink to={{
    //                           pathname: '/users',
    //                           hash: '#submit',
    //                           search: '?quick-submit=true'
    //                       }}>Users</NavLink></li>
    //                   </ul>
    //               </nav>
    //           </header>
    //           <Switch>    
    //               <Route path="/email" component={SendEmail} />
    //               <Route path="/users" exact component={Users} />
    //           </Switch> 
    //       </BrowserRouter>
    //     </div>
    // );
    }
}

export default Main;