import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function AddFeedback() {
 // const [userId, setUserId] = useState();
  const [messages, setMessages] = useState({message:"",userId:"",responce:""});

  const handleSubmit =(event) => {
   // console.log("hiiii2");
    event.preventDefault();
   
    const response= axios.post('http://localhost:8080/feedback/addFeedBack', 
     (messages)).then(console.log(messages));

     notify();
  };

  const notify = () => toast.success("Feedback submitted !", { autoClose: 2000 });

  return (
    <Form className='m-4'>
      <Form.Group controlId="message">
        <Form.Label>TextArea</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter your feedback message"
          onChange={(event) => setMessages({...messages,message:event.target.value,userId:sessionStorage.getItem("custId")})}
        />
      </Form.Group>

      <Button className='mt-3' onClick={handleSubmit}>submit </Button>
      
       <Button className="ms-5  mt-3 btn btn-warning" > <a href='/SeeFeedback' >See Feedback</a> </Button>
       <ToastContainer />
    </Form>
  );
}

export default AddFeedback;