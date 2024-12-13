import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useCart();

  const [auth, setAuth] = useAuth();

  //total price

  const totalPrice = () => {
    try {
      let total = 0;

      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  //delete item

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      // The splice method removes the item at the specified index.
      //1 indicates 1 items to be removed starting from that index
      myCart.splice(index, 1);
      setCart(myCart);

      // After remove update local storage with updated cart
      //otherwise the product again comes from localstorage
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Constructs the payment URL dynamically with the total amount, currency, and your email address.
  const handlePayment = async () => {
    const total = totalPrice();
    const email = "xxyyzzxxxyyzz5@gmail.com"; // Replace with your email address
    const paymentUrl = `https://epay.com/payment?amount=${total}&currency=USD&email=${email}`;

    try {
      // Prepare the order payload
      const orderData = {
        products: cart.map((item) => item._id), // Send product IDs
        payment: { method: "ePay", amount: total }, // Example payment object
        buyer: auth?.user?._id, // User ID
        address: auth?.user?.address, // User address
        email: auth?.user?.email, // Include the buyer's email
        name: auth?.user?.name, // Include the buyer's name
      };

      // Send the order data to the backend using axios
      const response = await axios.post(
        "http://localhost:8080/api/v1/order/place-order",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Order saved successfully:", response.data);
        // Redirect to ePay payment gateway
        window.location.href = paymentUrl;
      } else {
        console.error("Error saving order:", response.data);
      }
    } catch (error) {
      console.log("Error handling payment:", error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {/* Here ternary operator has been used . First if cart length is greater than 0 
              then show cart length otherwise show cart is empty. In case of first case another
              condition related to auth , if auth .token is found that means if user is logged 
              in [may be admin or general user ] then show empty string otherwise "login to 
              check out"            
             */}

              {cart?.length > 0
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to check out"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>

        {/* In Bootstrap, every row is divided into 12 equal parts by default, and
         this is the foundation of Bootstrap's grid system. This 12-column structure
         applies universally across all rows, making it a consistent and flexible
         layout system. 
         */}

        <div className="row">
          {/* Out of 12 9 column has been taken that means 75% space taken*/}
          <div className="col-md-4">
            {/* mapping cart and retreive product. Giving margin of size 2
             between 2 column in row */}
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row">
                <div className="col-md-5">
                  <img
                    // here ${p._id} is dynamically id is captured so dollar sign
                    //is used to get it.When the browser loads the image, it sends
                    //a GET request to the backend using this URL.
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height="200px"
                  />
                </div>
                <div className="col-md-7">
                  <p>{p.name}</p>
                  <p>Price:{p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removeCartItem(p._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* rest 25% taken for 2nd case */}
          <div className="col-md-8 text-center">
            <h2>Cart Summary</h2>
            Checkout | Payment | Total
            {/* horijontal tag */}
            <hr />
            <h4>Total : {totalPrice()} $</h4>
            {/* under auth there is user and under user 
            there is address
             */}
            {/* Use React Fragments when you need to group elements 
              without adding unnecessary DOM nodes. */}
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {/* here user is logged in but not given address[auth?.token? checking for logged in]
                 and in 2nd case user is not logged in */}
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
            <button
              className="btn btn-success mt-3"
              onClick={handlePayment}
              // The payment button is only enabled if the cart is
              // not empty and the user is logged in.
              disabled={cart?.length === 0 || !auth?.token}
            >
              Pay with ePay
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
