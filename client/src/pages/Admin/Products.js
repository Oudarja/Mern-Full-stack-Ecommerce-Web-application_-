import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
//As i have to send network request
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifecycle method

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All products</h1>

          <div class="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                // when the link will be clicked then on this link
                //the page will be navigated here ${p.slug} is dynamically adjusted
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
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
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
