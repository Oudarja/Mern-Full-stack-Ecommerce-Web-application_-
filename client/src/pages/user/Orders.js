import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/order/get-order/${auth?.user?._id}`
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
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
                        <td>{o?.status}</td>
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
      </div>
    </Layout>
  );
};

export default Orders;
