import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import { toast } from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category: {category?.name}</h4>
        <h6 className="text-center">{products?.length} results found</h6>

        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  // here ${p._id} is dynamically id is captured so dollar sign
                  //is used to get it.When the browser loads the image, it sends
                  //a GET request to the backend using this URL.
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
                      setCart([...cart, products]);
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
      </div>
    </Layout>
  );
};

export default CategoryProduct;
