import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  //get user data

  useEffect(() => {
    const { email, name, phone, address, password } = auth.user;

    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  //form function

  const handleSubmit = async (e) => {
    //deafult behavior of refreshing when submit
    // button isclicked is stopped
    e.preventDefault();
    try {
      //api request handling
      const { data } = await axios.put(
        "https://mern-full-stack-ecommerce-web-application.onrender.com/api/v1/auth/profile",
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Your profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="register">
              {/* custom function handlesubmit is called on 
 submit button is clicked */}
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>

                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="exampleInputName" className="form-label">
                    Name
                  </label>
                  {/* state has been binded with input now which will be in input fiels  that will be gone to state */}
                  <input
                    type="text"
                    value={name}
                    //  e is event by using this event the change will be detected and
                    //this change will be seton the corresponding field
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter your Name"
                  />
                </div>

                {/* email */}
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Enter your email"
                    disabled
                  />
                </div>

                {/* password */}
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label htmlFor="exampleInputPhone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Enter your mobile no"
                  />
                </div>

                {/* address */}
                <div className="mb-3">
                  <label htmlFor="exampleInputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter your present address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
