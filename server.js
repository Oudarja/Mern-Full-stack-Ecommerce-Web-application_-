// In type of package .json file "type":"commonjs" by default this is
// default module that is CommonJS (ES5-style) but "type": "module" indicates
// that ES6 modules

import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoute.js";
// Web browsers restrict cross-origin HTTP requests to prevent malicious websites from accessing
//sensitive data on another domain. However, there are legitimate use cases for cross-origin requests, such as:
//A React frontend hosted on http://localhost:3000 making API requests to a Node.js backend on http://localhost:5000.
//By default, such requests are blocked by the browser. To allow them, the server must include specific CORS headers
// in its response. The cors package helps to configure these headers.
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";

// Here if the .dotenv file's location path will be given inside config("/path/path")
// As here the .env file is in the root so no nned to give the path
dotenv.config();

//datanase config

connectDB();

//rest object

const app = express();

//*****middlewars****

app.use(cors());

/*
morgan is used to see which api has been hit and response of thst api
*/
//  This built-in middleware in Express parses
//  incoming JSON payloads in the request body.
app.use(express.json());
// morgan is a popular logging middleware for Node.js.
//  It logs details about each incoming request to the
// console, which is especially useful for debugging and
// monitoring during development.
app.use(morgan("dev"));

/*
A callback function is a function that is 
passed as an argument to another function 
and is intended to be "called back" or
executed at a later time, usually after 
some operation or event has occurred.
*/

/*
Callbacks are fundamental in asynchronous 
programming because they allow code to continue 
running without waiting for certain tasks to finish.
In asynchronous programming, tasks can run in the 
background, such as reading files, making network 
requests, or querying a database, while other parts 
of the program keep executing. Callbacks are the mechanism
to handle the result of those background tasks once they 
complete, without blocking the entire program.

*/

/*
nodemon is a tool that helps develop Node.js based
 applications by automatically restarting the node
 application when file changes in the directory are detected.

nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node


*/

//routes
//app.use("/api/v1/auth", authRoutes): Links the authRoutes module
//to the /api/v1/auth endpoint.
app.use("/api/v1/auth", authRoutes);
// it prefixes all routes defined inside the categoryRoutes file
//with /api/v1/category. This is a common pattern in Express.js for
//grouping and organizing routes by functionality.
app.use("/api/v1/category", categoryRoutes);

app.use("/api/v1/product", productRoutes);

app.use("/api/V1/order", orderRoutes);
//rest api

app.get("/", (req, res) => {
  // In JavaScript, res.send expects either a plain string or HTML as a string,
  res.send("<h1>Welcome to ecommerce web app</h1>");
});

//port
// Here port is exposed development mode it is not a problem
//but in production mode it is not secured so in dotenv file
// the confidential data should be kept[json web token,mongodb url,port,pament gateway]
// here 8080 will be considered  by default if there is any issue
const PORT = process.env.PORT || 8080;

//run listen

app.listen(PORT, () => {
  // text is white and color is cyan
  console.log(
    `Server Running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white
  );
});

/*
It looks like your server is running properly, and the login endpoint (/api/v1/auth/login) 
was successfully accessed with a 200 status code, indicating that the request was processed
without errors.
*/

/* why cors is a middleware?????

CORS fits this pattern perfectly because:

1)It checks incoming requests.
2)Adds appropriate CORS headers to the response.
3)Calls next() to allow the request to proceed to the 
next middleware or route handler if allowed.*/

/*
What is concurrently???
->The concurrently package in npm is a utility that allows
you to run multiple commands concurrently (at the same time) 
in a single terminal. It is especially useful in full-stack
JavaScript projects where you often need to run multiple processes 
simultaneously, such as a frontend development server and a backend
server.

//npm run dev will run both backend and fronted
*/
