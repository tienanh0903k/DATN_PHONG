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
  unusedCategories,
} from "../app/controllers/categories/category.controller";

import {
  createProduct,
  getAllProducts,
  getProductByID,
  getProductByShopId,
  getProductByCateoryID,
} from "../app/controllers/products/products.controller";
import {
  createVariantType,
  createVariantValue,
  createProductVariant,
  updateVariantType,
  updateVariantValue,
  getVariantType,
  getVariantValue,
  getProductVariantByCategoryId,
  getProductVariantByTypeId,
} from "../app/controllers/productVariant/productVariant.controller";
import {
  getCartByCustomerId,
  addToCart,
  deleteCart,
} from "../app/controllers/cart/cart.controller";
const serviceRouter = express.Router();

import { AiController } from "../app/controllers/AI/ai.controller";
import {
  getProduct,
  createOrder,
  updateBill,
  createOrderPaylate,
} from "../app/controllers/payment/payment.controller";

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
serviceRouter.get("/unused-categories", unusedCategories);

//products
serviceRouter.post("/create-product", createProduct);
serviceRouter.get("/get-all-products", getAllProducts);
serviceRouter.get("/get-product-by-id/:id", getProductByID);
serviceRouter.get("/get-product-by-category-id/:id", getProductByCateoryID);
serviceRouter.get("/get-product-by-shop-id/:id", getProductByShopId);

//product variant
serviceRouter.post("/create-variant-type", createVariantType);
serviceRouter.post("/create-variant-value", createVariantValue);
serviceRouter.post("/create-product-variant", createProductVariant);
serviceRouter.put("/update-variant-type", updateVariantType);
serviceRouter.put("/update-variant-value", updateVariantValue);
serviceRouter.get("/get-variant-type", getVariantType);
serviceRouter.get("/get-variant-value", getVariantValue);
serviceRouter.get(
  "/get-product-variant-by-category-id/:categoryId",
  getProductVariantByCategoryId
);
serviceRouter.get(
  "/get-product-variant-by-type-id/:typeId",
  getProductVariantByTypeId
);

//cart
serviceRouter.get("/get-cart/:customerId", getCartByCustomerId);
serviceRouter.post("/add-to-cart", addToCart);
serviceRouter.delete("/delete-cart/:cartId", deleteCart);

//ai
serviceRouter.post("/chat", AiController);

//payment
serviceRouter.get("/get-product/:id", getProduct);
serviceRouter.post("/create-order", createOrder);
serviceRouter.post("/create-order-paylate", createOrderPaylate);
serviceRouter.put("/update-bill", updateBill);

export default serviceRouter;
