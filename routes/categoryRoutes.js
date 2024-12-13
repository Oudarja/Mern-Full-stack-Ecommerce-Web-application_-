import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllcategoryController,
  getSinglecategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";
import { categoryWiseProductController } from "../controllers/productController.js";

const router = express.Router();

//routes
// creating category is only for admin
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
//It is also only for admin
//update will be done on the basis of id as there can be various category
//which category i want to update i have to find that
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all category

router.get("/get-all-category", getAllcategoryController);

//get single category

router.get("/get-single-category/:slug", getSinglecategoryController);

//delete category

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
