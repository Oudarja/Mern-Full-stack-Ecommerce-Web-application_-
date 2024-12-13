import React from 'react'
import Layout from './../../components/Layout/Layout';
import toast from 'react-hot-toast'
import axios from 'axios';
// import {useNavigate,useLocation} from 'react-router-dom';
// import { useAuth } from '../../context/auth';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';


const ForgotPassword = () => {
  
const[email,setEmail]=useState("");

const[newPassword,setNewPassword]=useState("");

const[answer,setAnswer]=useState("");

const navigate=useNavigate();

const handleSubmit=async (e)=>{

    //deafult behavior of refreshing when submit 
    // button isclicked is stopped 
    e.preventDefault();
    try
    {
     //api request handling
     const res=await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
      {email,newPassword,answer}
    );


    if(res && res.data.success)
    {
       toast.success(res.data && res.data.message);
       
       navigate("/login");
    }
    else{
      toast.error(res.data.message);
    }
    }
    catch(error)
    {
      console.log(error);
      toast.error("something went wrong");
    }
    
  };
  return (
    <Layout titile="Forgot Password -Ecommerece App">
      <div className="register">
   {/* custom function handlesubmit is called on 
   submit button is clicked */}
   <form onSubmit={handleSubmit}>
   <h4 className='title'>Reset Password</h4>
  
  
  {/* email */}
      <div className="mb-3">
      <label htmlFor="exampleInputEmail" className="form-label">Email</label>
      <input 
      type="email"
       value={email} 
       onChange={(e)=>setEmail(e.target.value)}
       className="form-control" 
       id="exampleInputEmail"
        placeholder='Enter your email'
        required
         />
      </div>
  
  {/* password */}
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
      <input type="password" 
      value={newPassword}  
      onChange={(e)=>setNewPassword(e.target.value)}
      className="form-control" 
      id="exampleInputPassword1"
       placeholder='Enter your password' 
       required
  
       />
    </div>

    {/* password */}
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Answer</label>
      <input type="text" 
      value={answer}  
      onChange={(e)=>setAnswer(e.target.value)}
      className="form-control" 
      id="exampleInputPassword1"
       placeholder='What is your favourite pet?' 
       required
  
       />
    </div>
    
    
    <button type="submit" className="btn btn-primary">RESET</button>
  </form>
  
     </div>
    </Layout>
  )
}

export default ForgotPassword
