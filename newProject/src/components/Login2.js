
import './Common.css'
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 

const Login2 = (props) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error,setError]  = useState('');
    var dataAfterLogin;

    var validate=(i,j)=>
    {
        var dataa = {
            
                "email": i,
                "password": j
            
        }
        // console.log(i+" "+j)
        axios.post("http://localHost:8080/user/login", dataa)
          .then( (response)=> {
            console.log(response.data);
            dataAfterLogin = response.data
            if (response.data != "") {
                sessionStorage.setItem("custId",response.data[0]);
                sessionStorage.setItem("cartId",response.data[1]);
                sessionStorage.setItem("role",response.data[2]);
                sessionStorage.setItem("name",response.data[3]);
                if(response.data[2]=="CUSTOMER"){
                    console.log("customer")
                    navigate('/menu')
                }else if (response.data[2]=="MANAGER"){
                    console.log("manager")
                    navigate('/receivedOrder')
                }else{
                    console.log("DB")
                    navigate('/assignedToDb')
                }
                setError("")
            } else {
                console.log("db")
                navigate('/')
                setError("Invalid credentials")
            }
          })
          .catch( (error) =>{
            console.log(error);
          });
    }

    return (
        <div className='App'>
        <div className='auth-form-container2'>
            <h2 className='mb-5' color='white'>Login</h2>
            <p style={{color:"red"}}>{error}</p>
            {/* <form> */}
            <div className="mb-3">
                {/* <label htmlFor="exampleFormControlInput1" className="form-label" style={{textAlign:'left'}} >
                Email address
                </label> */}
                <h6 style={{textAlign:'left'}}> Email address</h6>
                <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                {/* <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Password
                </label> */}
                <h6 style={{textAlign:'left'}}> Password</h6>
                <input
                    type='password'
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPass(e.target.value)}
                />
            </div>
            <div>
            <button className="btn btn-primary"  type="submit" onClick={()=>{validate(email, pass)}}>Log In</button>
            </div>
            {/* <button className="link-btn" style={{border:"none"}} onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button> */}
            <a className="link-btn" style={{border:"none"}} href='/regCust'>Don't have an account? Register here</a>
            {/* </form> */}
        </div>
        </div>
    )
}

export default Login2




