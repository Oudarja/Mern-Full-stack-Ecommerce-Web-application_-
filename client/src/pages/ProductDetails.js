import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProduct] = useState([]);

  const navigate = useNavigate();
  //   initial details

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getproduct
  const getProduct = async () => {
    try {
      // when running on local machine
      // `http://localhost:8080/api/v1/product/get-single-product/${params.slug}` but in case of render to become live
      const { data } = await axios.get(
        `https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/get-single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-5">
          <img
            src={`https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ width: "300px", height: "300px" }}
          />
        </div>

        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
          {/* <h6>Name: {product.shipping}</h6> */}
          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              toast.success("Item Added to the cart");
            }}
          >
            Add to cart
          </button>
        </div>
      </div>

      <div className="row container mt-2">
        <h1>Similar Products</h1>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found...</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
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
                <p className="card-text">{p.description.substring(0, 30)}...</p>
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
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
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
    </Layout>
  );
};

export default ProductDetails;
