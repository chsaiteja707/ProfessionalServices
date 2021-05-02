import React, {Component} from 'react';
import axios from 'axios';
import {Route, NavLink, Switch, BrowserRouter} from 'react-router-dom';


//  

class User extends Component{
    state={
        isEditable:false,
        fname:this.props.firstname,
        lname:this.props.lastname,
        email:this.props.email,
        updatedFname:'',
        updatedLname:'',
        updatedEmail:'',
        isLoading:false
    }

    clickEdit=()=>{    
        this.setState({isEditable:true});
    }

    fnameChangeHandler=(event)=>{
        this.setState({fname:event.target.value})
    }

    lnameChangeHandler=(event)=>{
        this.setState({lname:event.target.value})
    }

    emailChangeHandler=(event)=>{
        this.setState({email:event.target.value})
    }

    updateHandler=async (event)=>{
        this.setState({isLoading:true}) //never ever put a comma next to any statement it would fail to load other elements
        const user=await axios.put('http://localhost:4001/user',{email:this.state.email,firstname:this.state.fname,lastname:this.state.lname});
        // if(user.status)
        console.log(user)
        this.setState({isEditable:false,isLoading:false})
        this.props.fetchUserDetails();
        
        
        // this.setState
    }

    cancelHandler=(event)=>{
        this.setState({isEditable:false})
    }

    render(){
        var form=null;
        if(this.state.isEditable){
            form=(
                <div>
                    <label>First Name</label><br/>
                    <input  type="text" 
                            onChange={this.fnameChangeHandler}
                            value={this.state.fname}/><br/>
                    <label>Last Name</label><br/>
                    <input  type="text"  
                            onChange={this.lnameChangeHandler}
                            value={this.state.lname}/><br/>
                    <label> Email </label><br/>
                    <input  onChange={this.emailChangeHandler}
                            value={this.state.email}/><br/>
                    <button onClick={this.updateHandler}>Update</button>
                    <button onClick={this.cancelHandler}>Cancel</button>
                </div>
            )
        }
        else if(this.state.isLoading){
            form=(
                <div>Loading...</div>
            )
        }
        return(
            <tr>
                <td>{this.state.fname}</td>
                <td>{this.state.lname}</td>
                <td>{this.state.email}</td>
                <td><button onClick={this.clickEdit}>Edit</button></td>
                <br></br>
                {form}
            </tr>
        )
    }
}

export default User;
