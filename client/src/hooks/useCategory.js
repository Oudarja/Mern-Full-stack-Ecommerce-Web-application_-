import { useState, useEffect } from "react";

import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //getcat

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/category/get-all-category"
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
