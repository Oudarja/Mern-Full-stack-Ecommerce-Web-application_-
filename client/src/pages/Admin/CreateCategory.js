//useEffect and useState: React hooks for managing component
// state and lifecycle methods.

import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  // categories: An array to store all the categories fetched from
  //the backend.
  const [categories, setCategories] = useState([]);
  //name: The name of the new category to be created.
  const [name, setName] = useState("");
  //visible: Boolean state to control the visibility of the modal.
  const [visible, setVisible] = useState(false);
  //selected: The category object selected for editing.
  const [selected, setSelected] = useState(null);
  //updatedName: The updated name of the category during an edit
  //operation.
  const [updatedName, setUpdatedName] = useState("");

  //handle Form

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sends a POST request to create a new category.
      const { data } = await axios.post(
        "https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/category/create-category",
        { name }
      );
      //The ?. operator is called the optional chaining operator in JavaScript.
      /*
       1)If the value before ?. is null or undefined, the expression evaluates to undefined instead of 
       throwing an error.
       
       2)If the value exists (is not null or undefined), it proceeds to access the property.

       */
      if (data?.success) {
        toast.success(`${name} is created`);
        //Refreshes the category list after successful creation.
        getAllCategory();
      } else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error("somewthing went wrong");
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
      toast.error("Something went wrong in getting category");
    }
  };

  // Ensures categories are loaded when the component is first
  //rendered.
  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  //selected._id: Identifies the category to update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //delete category

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/category/delete-category/${id}`
      );

      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"All Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          {/* here ms-2 means margin-start  2 
              A blue primary-themed button
              danger represents red color 
          
          */}

                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

// When requiring users to interact with the application, but
//without jumping to a new page and interrupting the user's
//workflow, you can use Modal to create a new floating layer
// over the current page to get user feedback or display information.

/*
Following the Ant Design specification, we developed a React UI
library antd (Pronunciation) that contains a set of high quality
components and demos for building rich, interactive user interfaces.
*/
