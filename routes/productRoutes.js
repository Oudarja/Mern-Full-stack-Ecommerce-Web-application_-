import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
  productCountController,
  productFiltersControler,
  productListController,
  searchProductController,
  updateProductController,
  relatedProductController,
  categoryWiseProductController,
} from "./../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products
router.get("/get-product", getProductController);

//get single products
router.get("/get-single-product/:slug", getSingleProductController);

//get photo

router.get("/product-photo/:pid", getProductPhotoController);

router.delete(
  "/product-delete/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Filtering route
router.post("/product-filters", productFiltersControler);

//product route

router.get("/product-count", productCountController);

//product count

router.get("/product-list/:page", productListController);

//search product

router.get("/search/:keyword", searchProductController);

//similar product

router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product

router.get("/product-category/:slug", categoryWiseProductController);

export default router;
