import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "./../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
const HomePage = () => {
  // This is a custom hook wrapping React's useContext hook.
  //It provides access to the authentication context (AuthContext)
  // created in the AuthProvider

  //auth: The current authentication state

  //A function to update the auth state.
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // useState is a React Hook that initializes a state
  //variable and provides a function to update it.
  // The numbers 0 and 1 are the initial values for
  //the respective state variables.

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  //get total count

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //get all cat

  const getAllCategory = async () => {
    try {
      //Fetches all categories from the backend.
      const { data } = await axios.get(
        "https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/category/get-all-category"
      );

      if (data?.success) {
        //setCategories: Updates the categories state with the
        // fetched data.
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Ensures categories are loaded when the component is first
  //rendered.
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  // loadmore

  const loadMore = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //handleFilter function is designed to manage a list of
  //selected items (checked). It adds an id to the list if
  // value is true and removes it if value is false.

  /*

Checked: e.target.checked = true, id = c._id.
Unchecked: e.target.checked = false, id = c._id

//If the Checkbox is Unchecked (value = false):
Remove the ID (id) from the list

  */
  const handleFilter = (value, id) => {
    // A copy of the current checked array is created:
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // When a user checks or unchecks a box, the onChange event
  //triggers, passing the checkbox state (e.target.checked) and
  //the category ID (c._id) to handleFilte.checked is a list (array)
  // that stores the IDs of selected categories.

  //get filter

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"Home page-All products"}>
      {/* In the context of Bootstrap, a container-fluid class is a utility 
    class that creates a full-width container that spans the entire width
     of the viewport. */}

      {/* In the provided code, the row is used to define a container for a flexible
      grid layout in Bootstrap. */}

      <div className="container-fluid row mt-3">
        {/* first col  */}
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>

          {/* here all categories will be rendered */}
          {/* Here checkbox has been added */}
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>

          {/* here all categories will be rendered */}
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          {/* reset button for filter */}
          <div className="d-flex flex-column">
            {/* when reset button is clicked it reloades and reset all filter */}
            <button
              className="btn btn-danger mt-2"
              onClick={() => window.location.reload()}
              style={{ width: "100px" }}
            >
              RESET
            </button>
          </div>
        </div>

        {/* second col */}

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>

          {/*checking in radio the product id are added or not*/}
          {/* {JSON.stringify(radio,null,4)} */}

          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  // here ${p._id} is dynamically id is captured so dollar sign
                  //is used to get it.When the browser loads the image, it sends
                  //a GET request to the backend using this URL.
                  // for localserver :   src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  src={`https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">$ {p.price}</p>
                  {/*
                   ms:Stands for margin-start. ms-1 is a Bootstrap
                   utility class that applies margin-start (left 
                   margin in left-to-right layouts) of a specific
                   size to an element.  
                  */}
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to the cart");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="m-2 p-3 d-flex justify-content-center">
          {products && products.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Loadmore..."}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
