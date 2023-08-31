import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Common.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register2 = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [role, setRole] = useState('CUSTOMER');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const navigate = useNavigate();
    //var dataAfterReg;
    

    const [message,setMessage]  = useState('');


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(email);
    // }

    var reguser=(f,l,a,m,i,j,r)=>
    {
        var data = {

                "firstName":f,
                "lastName":l,
                "address":a,
                "phoneNo":m,
                "email": i,
                "password": j,
                "userRole":r
            
                    }

        // console.log(i+" "+j)

        axios.post("http://localHost:8080/user/register", data)
          .then( (response)=> {
            console.log(response.data);
            //dataAfterReg = response.data;
            if (response.data != "") {
            //     sessionStorage.setItem("custId",response.data[0]);
            //     sessionStorage.setItem("cartId",response.data[1]);
            //   //  navigate('/menu')
            toast.success('User Registered Successfully');
                setMessage("User Registered Successfully");
                navigate('/login2')
            } else {
               // navigate('/register')
            //    toast('User Registered Failed!!!');
                setMessage("Registration Failed !!!")
            }
          })
          .catch( (error) =>{
            toast.error('User Registered Failed!!!');
            console.log(error);
          });
    }


  return (
    
    <div  className='App' style={{ display:"flex" , padding: 20}}> 
    <div className='auth-form-container2' style={{display:"flex" ,textAlign:"center",padding: 20,borderRadius:"10px"}}>
      {/* <form> */}
      <div>
        <h2 className='mb-3'>Registration</h2>
        <hr></hr>

        <h6 style={{textAlign:'left'}}> First Name</h6>
        <input style={{height:"35px",width:500, borderRadius:10 , border:"none"}} value={firstname} name="firstname" onChange={(e) => setFirstName(e.target.value)} id="firstname" placeholder="First Name" />
        <br></br>
        <br></br>
        <h6 style={{textAlign:'left'}}> Last Name</h6>
        <input style={{height:"35px",width:500, borderRadius:10 , border:"none"}} value={lastname} name="lastname" onChange={(e) => setLastName(e.target.value)} id="lastname" placeholder="Last Name" />
        <br></br>
        <br></br>

        <h6 style={{textAlign:'left'}}> Address</h6>
        <textarea style={{height:"35px",height:100 , width:500, borderRadius:10 , border:"none"}} value={address} name="address" onChange={(e) => setAddress(e.target.value)} id="address" placeholder="address" />
        <br></br>
        <br></br>

        <h6 style={{textAlign:'left'}}> Phone Number</h6>
        <input style={{height:"35px",width:500, borderRadius:10 , border:"none"}} value={phoneNo} name="phoneNo" onChange={(e) => setPhoneNo(e.target.value)} id="phoneNo" placeholder="Phone No" />
        <br></br>
        <br></br>

        <h6 style={{textAlign:'left'}}>Email</h6>
        <input style={{height:"35px",width:500, borderRadius:10 , border:"none"}} value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <br></br>
        <br></br>

        <h6 style={{textAlign:'left'}}>Password</h6>
        <input style={{height:"35px",width:500, borderRadius:10 , border:"none"}} value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter password" id="password" name="password" />
        <br></br>
        <br></br>

        <h6 className="visually-hidden" style={{textAlign:'left'}}>Role</h6>
        <input className="visually-hidden" style={{height:"35px",width:500, borderRadius:"10px" , border:"none"}} readOnly="readOnly" value="CUSTOMER" name="role"  id="role" placeholder="Role" />
        <br></br>
        

        <h6></h6>
        <button className="btn btn-primary" style={{height:"35px",width:200 , borderRadius:"10px" , border:"none"}} type="submit" 
        onClick={()=>{reguser(firstname,lastname,address,phoneNo,email,pass,role)}}>
            Register
        </button> 
        <br></br>
        {/* <button className="link-btn" style={{textAlign:"center" , color:"black", border:"none"}} onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}
        <a href="/" style={{textAlign:"center" , color:"black", border:"none"}}>Already have an account? Login here</a>
        <ToastContainer />
      {/* </form> */}
      </div>
      {/* <button className="link-btn" style={{width:500}} onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}
      </div>
      <br></br>
      
    </div>
  )
}

export default Register2
