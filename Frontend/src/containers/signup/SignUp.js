import React, {Component} from 'react';
import 'axios';
import axios from 'axios';

// import './Login.css';

class Signup extends Component{
    state={
        firstName:'',
        lastName:'',
        password:'',
        confirmPassword:'',
        phoneNumber:'',
        email:'',
        address:'',
        city:'',
        role:'viewer',
        gender:'',
        errorsInValidation:false,
        isLoading:false

    }

    onChangeHandler(event){
        switch (event.target.id) {
            case "firstName":this.setState({firstName:event.target.value})
                break;
            case "lastName":this.setState({lastName:event.target.value})
                break;
            case "password":this.setState({password:event.target.value})
                break;
            case "confirmPassword":this.setState({confirmPassword:event.target.value})
                break;
            case "phoneNumber":this.setState({phoneNumber:event.target.value})
                break;
            case "email":this.setState({email:event.target.value})
                break;
            case "address":this.setState({address:event.target.value})
                break;
            case "city":this.setState({city:event.target.value})
                break;
            case "role":this.setState({role:event.target.value})
                break;
            case "gender":this.setState({gender:event.target.value})
                break;
            default:
                break;
        }
    }

    createUser= async()=>{
        this.state.isLoading=true;
        const user={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password,
            address:this.state.address,
            city:this.state.city,
            role:this.state.role,
            gender:this.state.gender,
        }
        try {
            const postUser=await axios.post('http://localhost:4002/user',{user:user})
            console.log(postUser);
            this.state.isLoading=false;
        } catch (error) {
            console.log(error);
        }
        
    }

    onSubmitHandler(event){
        event.preventDefault()
        if(this.state.password!==this.state.confirmPassword||
            
            this.state.password===''||
            this.state.gender===''||
            this.state.firstName===''||
            this.state.lastName===''||
            this.state.role===''||
            this.state.address===''||
            this.state.city===''||
            this.state.confirmPassword===''||
            this.state.email===''||
            this.state.phoneNumber===''||
            this.state.password.length<6)
        {
                this.setState({errorsInValidation:true})
                console.log(this.state)
        }else{
            this.setState({errorsInValidation:false})
            console.log('clean data')
            this.createUser();
        }
    }



    render(){
        var isLoading=<div>Loading...</div>
        var errorField=<div>Some Errors in validation</div>
        var form=(
            <div className="container">
                <form class="row g-3">
                <div class="col-md-4">
                    <label class="form-label">First Name</label>
                    <input  type="text" 
                            class="form-control"
                            id="firstName"
                            onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div class="col-md-4">
                    <label  class="form-label">Last Name</label>
                    <input  type="text" 
                            class="form-control"
                            id="lastName"
                            onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Password</label>
                    <input  type="password"
                            class="form-control"
                            id="password"
                            onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Confirm Password</label>
                    <input  type="password"
                            class="form-control"
                            id="confirmPassword"
                            onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Phone Number</label>
                    <input  type="text" 
                            class="form-control"
                            id="phoneNumber"
                            onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Email</label>
                    <input  type="email"
                            class="form-control"
                            id="email"
                            onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div class="col-6">
                    <label fo class="form-label">Address</label>
                    <input  type="text" 
                            class="form-control"
                            id="address"
                            onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div class="col-md-4">
                    <label class="form-label">City</label>
                    <input  type="text" 
                            class="form-control"
                            id="city"
                            onChange={this.onChangeHandler.bind(this)}/>
                </div>
                <div class="col-md-4">
                <label class="form-label">Role</label><br/>
                <select class="form-select form-select-sm" 
                        aria-label=".form-select-sm example" style={{width:"55%"}}
                        id="role"
                        onChange={this.onChangeHandler.bind(this)}
                        >
                    <option default value="viewer">Viewer</option>
                    <option value="manager">Manager</option>
                    <option value="seniorUser">Senior User</option>                    
                </select>
                </div>
                <div class="form-group">
                <label  class="form-label">Gender:</label><br/>
                    <div class="form-check form-check-inline">
                    <input  class="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions" 
                            id="gender"
                            onChange={this.onChangeHandler.bind(this)}
                            value="male"/>
                    <label class="form-check-label">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input  class="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions" 
                            id="gender"
                            onChange={this.onChangeHandler.bind(this)}
                            value="female"/>
                    <label class="form-check-label">Female</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input  class="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions" 
                            id="gender"
                            onChange={this.onChangeHandler.bind(this)}
                            value="other"/>
                    <label class="form-check-label">Other</label>
                    </div>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" onClick={this.onSubmitHandler.bind(this)}>Register</button>
                </div>
                </form>
            </div>
            
        )
        return(
            <div>
                {this.state.errorsInValidation?errorField:null}
                {this.state.isLoading?isLoading:form}
            </div>
            
        )
    }  
}

export default Signup;