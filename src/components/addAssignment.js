import React  from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js';
import { TextField } from '@mui/material';

class addAssignment extends React.Component {
    constructor(props) {
        super(props);
        console.log("addAssignment.cnstr "+ JSON.stringify(props.location));
        this.state = { name: '', dueDate: '' , courseId: ''};
    } 

    handleChange = (event) => {
        console.log("addAssignment.onChangeEvent " + event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = ( ) => {
        console.log("addAssignment.handleSubmit");
        const token = Cookies.get('XSRF-TOKEN');
        
        fetch(`${SERVER_URL}/assignment/` , 
            {  
                method: 'POST', 
                headers: { 'Content-Type': 'application/json',
                            'X-XSRF-TOKEN': token },
                body: JSON.stringify({assignmentName: this.state.name,
                  dueDate: this.state.dueDate,
                  courseId: parseInt((this.state.courseId))})
            })
        .then(res => {
            if (res.ok) {
              toast.success("Assignment successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
              });
            } else {
              toast.error("Assignment not added. failed", {
              position: toast.POSITION.BOTTOM_LEFT
              });
              console.error('POST http status =' + res.status);
        }})
          .catch(err => {
            toast.error("asssignment update failed", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
          });
     };   

     render() {
        return (
            <div>
                <h1> Add Assignment</h1>
                <h2>Name</h2>
                <TextField autoFocus style = {{width:200}} label="Name" name="name" 
                 onChange={this.handleChange} value={this.state.name} /> 

                <h2> Due Date</h2>
                <TextField style = {{width: 200}} label="Due Date" name="dueDate" 
                onChange={this.handleChange} value={this.state.dueDate} /> 

                <h2>Course ID Number</h2>
                <TextField style = {{width: 200}} label="Course ID" name="courseId" 
                onChange={this.handleChange} value={this.state.courseId} /> 
                <br></br>
                <Button id="Submit" variant="outlined" color="primary" style={{margin: 10}}
                  onClick={this.handleSubmit} >Submit</Button>

                <ToastContainer autoClose={1500} />           
            </div>
        )
     }
}
export default addAssignment;