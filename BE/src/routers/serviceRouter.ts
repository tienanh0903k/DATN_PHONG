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

import { createProduct } from "../app/controllers/products/products.controller";
import {
  createVariantType,
  createVariantValue,
  createProductVariant,
  updateVariantType,
  updateVariantValue,
  getVariantType,
  getVariantValue,
} from "../app/controllers/productVariant/productVariant.controller";

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

//products
serviceRouter.post("/create-product", createProduct);

//product variant
serviceRouter.post("/create-variant-type", createVariantType);
serviceRouter.post("/create-variant-value", createVariantValue);
serviceRouter.post("/create-product-variant", createProductVariant);
serviceRouter.put("/update-variant-type", updateVariantType);
serviceRouter.put("/update-variant-value", updateVariantValue);
serviceRouter.get("/get-variant-type", getVariantType);
serviceRouter.get("/get-variant-value", getVariantValue);
export default serviceRouter;
