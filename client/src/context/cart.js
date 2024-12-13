/*
This code creates a React Context to manage the state of a
shopping cart. It allows any component in the app to:

1)Access the cart's current state (the list of items in the cart).

2)Update the cart state (e.g., add or remove items).

*/

import { useState, useContext, createContext } from "react";
import { useEffect } from "react";

/*
createContext() creates a Context object called CartContext.
This Context will allow you to share the cart state across 
multiple components without prop drilling.

prop drilling: Prop Drilling refers to the process of passing 
data from a parent component to deeply nested child components
by passing it down through intermediary components as props.
*/

//CartContext is a container to hold your cart state.
const CartContext = createContext();

const CartProvider = ({ children }) => {
  //useState([]) initializes the cart as an empty array
  //(no items initially).
  //setCart is a function used to update the cart state.

  const [cart, setCart] = useState([]);

  // For updating the field in initial state from localstorage
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    // CartContext.provider makes possible to use
    /*
  {children} represents the child components that will be
   wrapped inside this provider. All these children will 
   have access to the cart state and setCart.
    */
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//Custom hook
//useContext(CartContext) is used to access the CartContext.
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
