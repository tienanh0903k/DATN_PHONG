import express from "express";
import {
  updateNumberPhoneController,
  updateEmailController,
  updateAddressController,
  updateCustomerController,
} from "../app/controllers/customer/customer.controller";
import { createShop, getShop } from "../app/controllers/shop/shop.controller";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../app/controllers/categories/category.controller";
const serviceRouter = express.Router();

serviceRouter.put("/change-infor/:customerId", updateCustomerController);
serviceRouter.put(
  "/change-number-phone/:customerId",
  updateNumberPhoneController
);
serviceRouter.put("/change-email/:customerId", updateEmailController);
serviceRouter.put("/change-address/:customerId", updateAddressController);

//shop
serviceRouter.post("/create-shop", createShop);
serviceRouter.get("/get-shop/:customerId", getShop);
//categories
serviceRouter.get("/get-all-categories", getAllCategories);
serviceRouter.post("/create-category", createCategory);
serviceRouter.put("/update-category", updateCategory);
serviceRouter.delete("/delete-category", deleteCategory);
export default serviceRouter;
