import React, {Component} from 'react';
import SendEmail from './login/email/SendEmail';
import Login from './login/Login';
// import Signup from './signup/SignUp';
import './Main.css';
import Signup from './signup/SignUp';

class Main extends Component{
  state={
    isLoginClicked:true,
    isSignupClicked:false,
    emailService:false
  }

    onLoginClickedHandler=(event)=>{
      console.log('login clicked');
      this.setState({isLoginClicked:true,isSignupClicked:false})
    }

    onSignUpClickedHandler=(event)=>{
      console.log('signup clicked')
      this.setState({isLoginClicked:false,isSignupClicked:true})
    }

    onEmailClicked=(event)=>{
      // console.log('here')
      this.setState({emailService:!this.state.emailService});
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
      var menu=null;
      if(this.state.emailService){
        menu=(
          <div>
            <SendEmail/>
          </div>
        )
      }

      return (
        <div className="Main">
          <h1>Professional Services App</h1>
          {/* <button onClick={this.onLoginClickedHandler}>Login</button>
          <button onClick={this.onSignUpClickedHandler}>Signup</button> */}
          {/* {loginOrSignup} */}
          <button onClick={this.onEmailClicked}>Send Email</button>
          {menu}
        </div>
      )
    }
}

export default Main;