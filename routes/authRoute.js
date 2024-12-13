import express from "express";

import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authController.js";
//router object
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routing
//Register||method post
//as mvc pattern is followed so different folder has been created for
//keeping all controller so instead of defining the call back function
//here it has been defined in Controller folder separetely
router.post("/register", registerController);

//POST ||LOGIN

router.post("/login", loginController);

//forgot password||post

router.post("/forgot-password", forgotPasswordController);

//test routes

// Here middleware is attached
//Middleware functions are executed during the lifecycle of a request, before
//the controller functions are called. Middleware can handle things like authentication, logging, or validation.
//Middleware is often applied to API routes to protect or process them before reaching the controller.

//requiresignin is middleware
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth

///protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

///protected admin route auth
//middle ware require sing in and isadmin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile

router.put("/profile", requireSignIn, updateProfileController);

export default router;
