import React,{ Component } from 'react';

import StoreItem from '../StoreItem/StoreItem'

class Shop extends Component{

    state={
        loading:false,
        a:[1,2,3,4,5]
    }

    componentDidMount(){
        //try to retrieve the store items from DB
        console.log('i am here while component got mounted')
    }

    render(){
        return(
            <div>
                {this.state.a.map(user => {
                    return <StoreItem/>
                })}
            </div>
        )
    }
}

export default Shop;