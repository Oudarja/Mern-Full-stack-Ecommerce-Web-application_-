import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu.js";
import Layout from "./../../components/Layout/Layout.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/order/get-all-order/${auth?.user?._id}`
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // To permamnently change the order status in backend the change has to be done
  //for this api would have to be created so api has been created and in backend database
  // when admin change order status it gets changed.
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/order/order-status/${orderId}`,
        { status: value }
      );
      // call getOrders so that page gets updated
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title="All orders">
        <div className="row container-fluid p-3 m-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Products</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* index */}
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.name}</td>
                        <td>{o?.email}</td>

                        <td>
                          <div>
                            {o.products.map((product) => (
                              <div key={product._id}>
                                <h6>{product.name}</h6>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>{o?.payment?.amount}$</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminOrders;
