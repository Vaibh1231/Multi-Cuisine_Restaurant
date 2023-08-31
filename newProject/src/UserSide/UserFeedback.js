import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserFeedback() {
        
    return (
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', border: '1px solid #ccc' }}>

       <center>
       
                <Button color='info' size='lg' outline>
                        <a href="/AddFeedback" style={{height:"50px", width:"150px"}}>Add Feedback</a>
                </Button>
               <br></br>
               <br></br>
                <Button color='info' size='lg' outline>
                        <a href="/SeeFeedback" >See Feedback</a>
                </Button>  
       </center>
      </div>
    );
  }
  
  export default UserFeedback;