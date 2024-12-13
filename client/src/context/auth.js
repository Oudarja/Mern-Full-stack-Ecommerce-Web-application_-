import { useState,useEffect,useContext,createContext} from "react";
import axios from 'axios'
// This creates a context named AuthContext to hold the authentication state.
//The createContext() function provides a mechanism to share state globally 
//across components.
const AuthContext=createContext()

// This is a wrapper component that provides the auth state and its updater 
//function (setAuth) to all child components.
const AuthProvider=({children})=>
{
 
 /*
The auth state is initialized with:
user: null (indicating no user is logged in initially).
token: "" (indicating no authentication token).
*/
const [auth,setAuth]=useState({

    user:null,
    token:""
});

//This useEffect snippet is a React hook used for synchronizing state
// with local storage when the auth state changes.

/*
1)Retrieve Authentication Data:
It checks local storage for the auth key (where authentication data might have been saved earlier).
If the data exists, it parses it and uses the values to update the auth state.


2)Synchronize State with Local Storage:
If the auth state changes (due to the dependency auth in the array), this effect runs again.
It ensures the auth state reflects the latest data from local storage.

*/
//default axios
// makes sure that every API request you make using Axios 
//automatically includes the user's token in the headers.
// The token is used to prove to the server that the user
// is authorized (logged in).

//auth?.token: It gets the token stored in your app (if it exists).
//Authorization: This is the header where the token is placed.
//axios.defaults.headers.common: This sets the token as a default 
//for all Axios requests, so you don’t have to add it manually
// every time.


axios.defaults.headers.common["Authorization"]=auth?.token;




//[auth] This makes the effect re-run whenever the auth state changes, ensuring
// synchronization between the state and local storage.

useEffect(()=>{
    const data=localStorage.getItem("auth");

    if(data)
    {
        const parseData=JSON.parse(data);
        setAuth({
            ...auth,
            user:parseData.user,
            token:parseData.token
        });
    }
    //eslint-disable-next-line
},[]);

//here inside [] bracket a dependcy was passed and for this 
//after login continous execution done which uses cpu and memory
//unintendly so disable this
return (
    // The AuthContext.Provider is used to pass the auth state 
    //and setAuth function down to any components within the 
    //AuthProvider component tree.
    <AuthContext.Provider value={[auth,setAuth]}>
    {/* The children prop is a special React prop that allows you 
    to wrap other components. These components will have access to
     the auth state and the setAuth function. */}
       {children}
    </AuthContext.Provider>
);

};


//Custom hook
// This is a custom hook to simplify consuming the AuthContext in other components.
//Instead of importing and using useContext(AuthContext) in every component, you can 
//use useAuth() for cleaner and more consistent code.

const useAuth=()=>useContext(AuthContext)

export {useAuth,AuthProvider};
/*
The auth state is accessible from any component wrapped by AuthProvider.
State Management:

The auth object holds two key pieces of information:
1)user: Information about the logged-in user.

2)token: Authentication token used for API requests.
Ease of Use:

Components can access and update the authentication state using the useAuth
hook, without the need for prop drilling.
*/