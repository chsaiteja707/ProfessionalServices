import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios'

class Recon extends Component{

    state={
        userArray:[],
        isLoading:false,
        reconOutput:null
    }

    doRecon=async(event)=>{
        event.preventDefault();
        this.setState({isLoading:true})
        console.log('I am here');
        var userObjects=[];
        for (let i = 1; i < this.state.userArray.length; i++) {
            const element = this.state.userArray[i];
            var userObject=element.split(',')
            if(userObject.length>1){
                userObjects.push({'First Name':userObject[0],
                                'Last Name':userObject[1],
                                Email:userObject[2]
                        })
            }
        }
        var reconServerResponse=await axios.post('http://localhost:5000/external',userObjects,{ headers: {"Authorization" : 'Bearer '+sessionStorage.getItem('userSessionID')} });
        console.log(reconServerResponse);
        reconServerResponse=reconServerResponse.data.emailText.split('\n');
        this.setState({isLoading:false,reconOutput:reconServerResponse});

    }

    fileHandler(event){
        let file=event.target.files
        var userArray=[];
        let reader=new FileReader();
        
        reader.readAsText(file[0]);
        reader.onload=(event)=>{
            var k=event.target.result;
            userArray=k.split('\n');
            // console.log(userArray)
        }
        reader.onloadend=(event)=>{
            this.setState({userArray:userArray,reconOutput:null})
        }
    }
    render(){
        var display=null;
        var reconData=this.state.reconOutput?
            <div>
                <h3>Recon Users</h3>
                        {this.state.reconOutput.map((name,index)=>{
                            return <p>{name}</p>
                        })}

            </div>
            :<div></div>
        if(this.state.isLoading){
            display=(
                <div>loading...</div>
            )
        }else{
            display=(
                <div>
                    <Form>
                        <Form.Group>
                            <Form.File
                            className="position-relative"
                            id="validationFormik107"
                            onChange={this.fileHandler.bind(this)} //without this bind the global this can't be accessed in filehandler function
                            feedbackTooltip
                            
                            />
                        </Form.Group>
                        <Button onClick={this.doRecon}>Validate Form</Button>
                    </Form>
                </div>
            )
        }
        return(
            <div>
                {display}
                {reconData}
            </div>
        )
    }
}

export default Recon;