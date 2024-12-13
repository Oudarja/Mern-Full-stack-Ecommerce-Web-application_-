import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//functionality of router will be enabled through beowser router
//from react router dom
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import "antd/dist/reset.css";
import { CartProvider } from "./context/cart";

// The AuthProvider is included in the index.js file because it
//needs to wrap the entire application to ensure that the
//authentication state is available globally to all components.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// AuthProvider provides the auth state and setAuth function via AuthContext.
//Wrapping the root component (App) ensures that every component in the
// application tree has access to the auth context.

/*
Any component, regardless of where it is in the tree, can call useAuth() 
to access or update the authentication state.
*/
