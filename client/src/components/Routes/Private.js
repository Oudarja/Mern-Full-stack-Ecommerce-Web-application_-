import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  // ok state as false using useState(false).
   //auth state from useAuth(). This contains 
   //the user's authentication details, such as user and token.
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
        // Here user's token is get or read from this route 
        //this route's end point /user-auth is hit into backend authroute and there after 
        // passing middleware the response is getback into res variable 
      const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
// If ok === true: The <Outlet /> component is rendered, which
// represents the child routes (protected content).
//If ok === false: The <Spinner /> component is rendered, showing 
//a loading spinner while the authentication check is happening.
  return ok ? <Outlet /> : <Spinner />;
}


/*
1. Component Render (Initial Render):
The useEffect hook is triggered on the first render.
Inside useEffect, it checks whether auth?.token exists:
If the token exists, the authCheck function is invoked asynchronously.
If not, no action is taken, and the component remains in the initial 
state (ok = false).


2)Auth Check (When auth?.token is Present):

API Request:

The authCheck function sends a GET request to http://localhost:8080/api/v1/auth/user-auth using Axios.
This endpoint is a protected route in your backend, which requires the token for validation.
Token Validation:

The request includes the token in the Authorization header. The backend middleware (requireSignIn) 
extracts and verifies this token.

Backend Response:

If the token is valid:
The backend responds with { ok: true } and HTTP status 200.

If the token is invalid or missing:
The backend responds with an error (e.g., HTTP status 401 Unauthorized or 403 Forbidden).

Response Handling:
The response (res.data.ok) is checked in authCheck:
If res.data.ok is true, setOk(true) is called to mark the user as authenticated.
Otherwise, setOk(false) is called.


3. React State Update and Re-Render

1)State Change:

If the ok state changes, React re-renders the PrivateRoute component.

2)Conditional Rendering:

The ok state determines what is rendered:
If ok === true: The <Outlet /> component is rendered, which represents the child routes (protected content).
If ok === false: The <Spinner /> component is rendered, showing a loading spinner while the authentication check is happening.


*/