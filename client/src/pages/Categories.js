import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All categories"}>
      <h1>All categories</h1>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3">
              <button className="btn btn-primary">
                {/* dynamically according to slug redirected to 
              page and the page is CategoryProduct.js */}
                <Link to={`/category/${c.slug}`} className="btn btn-primary">
                  {c.name}
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
