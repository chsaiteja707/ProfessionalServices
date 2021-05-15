import React, {Component} from 'react';
import axios from 'axios';
// import {Route, NavLink, Switch, BrowserRouter} from 'react-router-dom';

// import User from '../../../../components/user/User';
import Pagination from 'react-js-pagination';
import './Users.css'
import User from './user/User'



class Users extends Component{
    state={
        isLoading:false,
        users:[

        ],
        totalUsers:0,
        usersPerPage:15,
        pageNo:1,
        totalPages:0,
        activePage:1
    }

    componentDidMount=async()=>{
        this.setState({totalPages:Math.ceil(this.props.totalUsers/this.state.usersPerPage)});
        this.fetchUserDetails(15,1);
    }

    fetchUserDetails=async(limit,pageNumber)=>{
        this.setState({isLoading:true})
        var sessionToken=sessionStorage.getItem('userSessionID');
        var users= await axios.get(`http://localhost:4001/users/10/${pageNumber}`,
                    { headers: {'Authorization' : 'Bearer '+sessionToken} }
                )
        if(users.status>=200&&users.status<300){
            users=[...users.data]
            this.setState({users:users})
        }
        this.setState({isLoading:false})
    }

    handlePageChange(pageNumber){
        this.setState({activePage:pageNumber})
        this.fetchUserDetails(this.state.usersPerPage,pageNumber)
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
            <div className="users-class">
                {display}
                <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.props.totalUsers}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
                />
            </div>   
        )
        
    }
}

export default Users;