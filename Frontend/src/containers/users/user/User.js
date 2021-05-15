import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap'

class User extends Component{
    state={
        isEditable:false,
        fname:this.props.firstname,
        lname:this.props.lastname,
        email:this.props.email,
        updatedFname:this.props.firstname,
        updatedLname:this.props.lastname,
        updatedEmail:this.props.email,
        isLoading:false
    }

    clickEdit=()=>{    
        this.setState({isEditable:true});
    }

    fnameChangeHandler=(event)=>{
        this.setState({updatedFname:event.target.value})
    }

    lnameChangeHandler=(event)=>{
        this.setState({updatedLname:event.target.value})
    }

    emailChangeHandler=(event)=>{
        this.setState({updatedEmail:event.target.value})
    }

    updateHandler=async (event)=>{
        this.setState({isLoading:true}) 
        try{
            var sessionToken=sessionStorage.getItem('userSessionID');
            const user=await axios.put('http://localhost:4001/user',{email:this.state.updatedEmail,firstname:this.state.updatedFname,lastname:this.state.updatedLname},{ headers: {"Authorization" : "Bearer "+sessionToken} });
            console.log(user);
        } catch(error){
            alert('some error')
        }
        //never ever put a comma next to any statement it would fail to load other elements
        this.setState({isEditable:false,isLoading:false})
        this.props.fetchUserDetails(15,1);
    }

    cancelHandler=(event)=>{
        this.setState({isEditable:false,isLoading:false})
    }

    render(){
        var form=null;
        if(this.state.isEditable){
            form=(
                <div>
                    <label>First Name</label><br/>
                    <input  type="text" 
                            onChange={this.fnameChangeHandler}
                            value={this.state.updatedFname}/><br/>
                    <label>Last Name</label><br/>
                    <input  type="text"  
                            onChange={this.lnameChangeHandler}
                            value={this.state.updatedLname}/><br/>
                    <label> Email </label><br/>
                    <input  onChange={this.emailChangeHandler}
                            value={this.state.updatedEmail}/><br/>
                    <Button variant="outline-success" size="sm" onClick={this.updateHandler}>Update</Button>
                    <Button variant="outline-danger" size="sm" onClick={this.cancelHandler}>Cancel</Button>

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
                <td><Button variant="primary" size="sm" onClick={this.clickEdit}>Edit</Button></td>
                <br></br>
                {form}
            </tr>
        )
    }
}

export default User;
