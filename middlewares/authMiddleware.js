import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//protected Routes token base

// the authorization middleware (requireSignIn in your code) expects
// a JSON Web Token (JWT) in the request headers,

/*
This middleware, requireSignIn, is designed to protect certain routes by 
verifying that the incoming request has a valid JSON Web Token (JWT). 
If the token is valid, it allows the request to proceed; otherwise, it 
stops the request and logs an error.
*/
export const requireSignIn=async(req,res,next)=>{

    try{
        const decode=JWT.verify(
            //attempts to extract and verify the JWT token from the request headers.
            //req.headers.authorization should contain the token, which is expected to
            // be passed as part of the Authorization header.
            req.headers.authorization,process.env.JWT_SECRET);
            
            //JWT.verify to decode and verify the token provided in req.headers.authorization.
            // The token is validated using JWT_SECRET, a secret key stored in environment variables.
            //If the token is valid, decode will contain the token's payload (such as user ID, username, or 
            //other relevant information).

            req.user=decode
         //next is a function that moves the request to the next middleware or route handler.
            next();
    }
    catch(error)
    {
        console.log(error);
    }
};

/*
//req.headers.authorization should contain the token, which is expected to be
// passed as part of the Authorization header.
//secret key (process.env.JWT_SECRET) used to verify the token’s signature, typically 
//stored in environment variables for security.
//If the token is valid, JWT.verify decodes the token and returns the decoded information.
*/


//middleware for admin access

export const isAdmin=async(req,res,next)=>
    {
  
    try{
        const user=await userModel.findById(req.user._id)

        if(user.role!==1)
            {
                return res.status(401).send({
                success:false,
                message:"Unauthorized Access",
            });
    }
    else
    {
        //If this admin then go for next
           next(); 
    }
  }
    catch(error)
    {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"Error in admin middleware"

        })
    }
};

/*
1xx: Informational, request is received and processing.
2xx: Success, request completed successfully.
3xx: Redirection, additional action needed to complete request.
4xx: Client error, issues with the request.
5xx: Server error, server encountered an issue.
*/