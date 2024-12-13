import express from "express";
import {
  getAllOrderController,
  getUserOrderController,
  orderStatusController,
  placeOrderController,
} from "./../controllers/orderController.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import { requireSignIn } from "./../middlewares/authMiddleware.js";

const router = express.Router();
// As this api is included with paywithEpay button which is only shown when user is logged in so
// no need to include requiresign in middleware
router.post("/place-order", placeOrderController);

//get order for buyer or user
router.get("/get-order/:id", requireSignIn, getUserOrderController);

//get order for admin [get all the placed order] for admin
// To protect the getAllOrderController route, you should use your isAdmin middleware.
router.get("/get-all-order/:id", requireSignIn, isAdmin, getAllOrderController);

//order status update

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
