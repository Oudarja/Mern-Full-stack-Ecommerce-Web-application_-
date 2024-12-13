// App.js is a main component
//Routes works like container
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Contacts from "./pages/Contacts";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard.js";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword.js";
import AdminRoute from "./components/Routes/AdminRoute";
import Admindashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory.js";
import CreateProduct from "./pages/Admin/CreateProduct.js";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct.js";
import CartPage from "./pages/CartPage.js";
import AdminOrders from "./pages/Admin/AdminOrders.js";

function App() {
  return (
    <>
      <Routes>
        {/* Here all the routes have been defined */}
        <Route path="/" element={<HomePage />} />

        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        {/* nested route First protected route will be checked and then the dashboard will be shown or 
          the access can be got
       
        */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />

          <Route path="admin/create-product" element={<CreateProduct />} />

          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/products" element={<Products />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contacts />} />

        <Route path="/policy" element={<Policy />} />

        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;

//SEO(search engine optimization): The more web site seo based the rank of web site more
//better will be  the rank of web site when searched

//*************Important note************ */
/*

An API (Application Programming Interface) is a way for software components 
to communicate with each other. In the context of web development, APIs are 
often endpoints exposed via HTTP that allow clients (e.g., frontend apps or 
other systems) to interact with the backend.
*/
/************************Important note ****************/
/*
When you define a @RestController or @Controller in Spring Boot and use mappings 
like @GetMapping, @PostMapping, @PutMapping, etc., you are creating RESTful API
endpoints. These endpoints handle HTTP requests and provide responses, making 
them APIs.
*/

/********************Important note************************** */
/*
In the MERN stack, APIs are typically implemented in the backend, where
you define routes using Express.js. These routes handle HTTP requests 
(like GET, POST, PUT, DELETE) and provide responses.
*/
