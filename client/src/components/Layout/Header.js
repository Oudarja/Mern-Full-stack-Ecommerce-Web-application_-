import React from "react";
import { NavLink, Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import Searchinput from "../Form/Searchinput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    setCart([]); // Clear the cart for the new user
    localStorage.removeItem("auth");

    toast.success("Logout Successfully");
    // Remove cart from local storage, if saved
    localStorage.removeItem("cart");
  };

  return (
    <>
      {/* This is a header bootstrap is used.Bootstrap for styling the navigation bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {/* NavLink elements don't need the href attribute since they handle routing based on the to attribute. */}
            <Link to="/" className="navbar-brand">
              <GiShoppingCart />
              Ecommerece App
            </Link>

            {/* here me-auto that means margin end is auto to push the navbar item right 
     it has to be changed to ms-auto */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Searchinput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                {/* need to render a single <ul> element that contains all the <li> items for each category */}
                <ul className="dropdown-menu">
                  <Link className="dropdown-item" to={"/categories"}>
                    Categories
                  </Link>

                  {categories?.map((c) => (
                    <li>
                      {/* Under the category dynamically page will be accessed */}
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>

                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                {/* This badge comes from UI library antdesign 
               Ant Design is an open-source design system and 
               React UI library for developing enterprise products
              */}

                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Bootsrap code ends here */}
    </>
  );
};

export default Header;
