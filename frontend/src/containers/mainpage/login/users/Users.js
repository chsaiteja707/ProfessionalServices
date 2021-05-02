import React, {Component} from 'react';
import axios from 'axios';
// import {Route, NavLink, Switch, BrowserRouter} from 'react-router-dom';

// import User from '../../../../components/user/User';
import './Users.css'
import User from './user/User'


class Users extends Component{
    state={
        isLoading:false,
        users:[

        ]
    }

    fetchUserDetails=async()=>{
        this.setState({isLoading:true})
        var users= await axios.get('http://localhost:4001/users')
        if(users.status>=200&&users.status<300){
            users=[...users.data]
            this.setState({users:users})
        }
        this.setState({isLoading:false})
    }

    componentDidMount(){
        this.fetchUserDetails();
    }
    

    render(){
        var display=null;
        if(this.state.isLoading){
            display=(
                <div>
                    loading...
                </div>
            )
        }else{
            display=(   
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user,index)=>{
                                return (<User
                                        firstname={user.firstname||user["First Name"]}
                                        lastname={user.lastname||user[" Last Name"]}
                                        email={user.email||user[" Email"]}
                                        fetchUserDetails={this.fetchUserDetails.bind(this)}/>)
                            })}
                       </tbody>
                    </table>
                </div>
            )
        }
        return(
            <div>
                {display}
            </div>   
        )
        
    }
}

export default Users;