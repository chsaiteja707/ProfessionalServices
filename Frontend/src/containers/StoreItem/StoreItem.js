import React,{ Component } from 'react';

class StoreItem extends Component{
    render(){
        return(
            <div class="d-flex position-relative" style={{border:'2px solid black',margin:'2%    '}}>
                <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80" class="flex-shrink-0 me-3 " style={{width:'150px',height:'150px'}} alt="..."/>
                <div>
                    <h5 class="mt-0">Item</h5>
                    <p>This is some placeholder content for the custom component. It is intended to mimic what some real-world content would look like, and we're using it here to give the component a bit of body and size.</p>
                    <a href="#" class="stretched-link">Go somewhere</a>
                </div>
            </div>
        )
    }
}

export default StoreItem;