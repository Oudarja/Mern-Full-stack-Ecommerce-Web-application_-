// Here usestate is used to store the data input buy user and let them send to server in database
import React,{ useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const Register = () => {

  // State is used to work with change event in the input field
    const [name,setName]=useState("")

    const[email,setEmail]=useState("")

    const[password,setPassword]=useState("")

    const [phone,setPhone]=useState("")

    const[address,setAddress]=useState("")

    const[answer,setAnswer]=useState("")



/*
A hook is a special function in React that allows you to "hook into" React
features, such as state management or lifecycle methods, in functional components.
*/
    /*
The useNavigate hook is a function provided by React Router v6 to programmatically 
navigate between routes in your application.
Use Case:
You use useNavigate to redirect users to different pages, often after an event like 
form submission, button clicks, or conditionally rendering pages.


    */
    const navigate=useNavigate();


    //form function

    const handleSubmit=async (e)=>{

      //deafult behavior of refreshing when submit 
      // button isclicked is stopped 
      e.preventDefault();
      try
      {
       //api request handling
       const res=await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {name,email,password,phone,address,answer}
      );


      if(res && res.data.success)
      {
         toast.success(res.data && res.data.message);
         //after success fully registration navigate to login page
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
    <Layout title="Register-Ecommerce App">

  <div className="register">
 {/* custom function handlesubmit is called on 
 submit button is clicked */}
 <form onSubmit={handleSubmit}>
 <h4 className='title'>Register page</h4>

 {/* Name */}
  <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    {/* state has been binded with input now which will be in input fiels  that will be gone to state */}
    <input 
    type="text"
     value={name} 
    //  e is event by using this event the change will be detected and 
    //this change will be seton the corresponding field
     onChange={(e)=>setName(e.target.value)}
     className="form-control" 
     id="exampleInputName"
      placeholder='Enter your Name'
      required
       />
    </div>

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
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" 
    value={password}  
    onChange={(e)=>setPassword(e.target.value)}
    className="form-control" 
    id="exampleInputPassword1"
     placeholder='Enter your password' 
     required

     />
  </div>

{/* Phone */}
  <div className="mb-3">
    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
    <input type="text"
     value={phone} 
     onChange={(e)=>setPhone(e.target.value)}
     className="form-control" 
     id="exampleInputPhone"
      placeholder='Enter your mobile no'
      required
       />
    </div>


{/* address */}
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input type="text"
     value={address} 
     onChange={(e)=>setAddress(e.target.value)}
     className="form-control"
      id="exampleInputAddress"
       placeholder='Enter your present address' 
       required
       />
    </div>

    {/* answer*/}
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Answer</label>
    <input type="text"
     value={answer} 
     onChange={(e)=>setAnswer(e.target.value)}
     className="form-control"
      id="exampleInputAnswer"
       placeholder='What is your favourite pet' 
       required
       />
    </div>

  <button type="submit" className="btn btn-primary">REGISTER</button>
</form>

   </div>

</Layout>
  )
}

export default Register


/*

Axios is a popular JavaScript library used for making HTTP 
requests from the browser or Node.js applications. It allows
you to interact with APIs and perform operations such as 
fetching data, submitting forms, and updating data on a server.

If httpclient has to be used in react then the best is axios library
here httpclient is user
*/

/*
Axios is a popular JavaScript library used for making HTTP requests
from the browser or Node.js applications. It allows you to interact
with APIs and perform operations such as fetching data, submitting 
forms, and updating data on a server.
*/