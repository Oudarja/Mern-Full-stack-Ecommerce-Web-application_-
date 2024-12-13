// Here usestate is used to store the data input buy user and let them send to server in database
import React,{ useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom';
import { useAuth } from '../../context/auth';



// Login is by only email and password

const Login = () => {

    const[email,setEmail]=useState("")

    const[password,setPassword]=useState("")

    const[auth,setAuth]=useAuth()

    const navigate=useNavigate();

    const location=useLocation();

    const handleSubmit=async (e)=>{

        //deafult behavior of refreshing when submit 
        // button isclicked is stopped 
        e.preventDefault();
        try
        {
         //api request handling
         const res=await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/login`,
          {email,password}
        );
  
  
        if(res && res.data.success)
        {
           toast.success(res.data && res.data.message);
           
           setAuth({
            //...auth spreads out all the existing properties and values
            // of the auth object into the new object being created.
            //The user and token properties are overwritten (or added, if 
            //they don't already exist) with the new values from res.data.
            /*
            By spreading ...auth, you keep all the original properties of 
            auth that aren't explicitly updated.
            */

            ...auth,
            user:res.data.user,
            token:res.data.token
           });

            //store in local storage
           localStorage.setItem('auth',JSON.stringify(res.data));



           //after success fully registration navigate to home page
           //here before login if user wanted to access any page that path location 
           //gets priority first and that location is stored in spinner.js page using useLocation hook
           navigate(location.state||"/");
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
   <h4 className='title'>Login page</h4>
  
  
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

    <div className='mb-3'>
    
    <button type="button"
     className="btn btn-primary"
      onClick={()=>{navigate('/forgot-password')}}>
      Forgot Password
      </button>

      </div>
    
    
    <button type="submit" className="btn btn-primary">LOGIN</button>
  </form>
  
     </div>
  
  </Layout>
  )
}

export default Login
