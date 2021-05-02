import React from 'react';

const User=(props)=>{
    return(
        <tr>
            <td>{props.firstname}</td>
            <td>{props.lastname}</td>
            <td>{props.email}</td>
            <td><button>Edit</button></td>
        </tr>
    )
}

export default User;