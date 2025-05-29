import express from "express";
import {
  updateNumberPhoneController,
  updateEmailController,
  updateAddressController,
  updateCustomerController,
  getBillByCustomerIdController,
} from "../app/controllers/customer/customer.controller";
import {
  createShop,
  getShop,
  getOrderListByShopId,
  getOrderListByStatus,
  updateShop,
  getShopById,
  getCountProductByShopId,
  getTotalSalesAmount,
  getAverageRating,
} from "../app/controllers/shop/shop.controller";
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
  getAllProductsAdmin,
  getProductByID,
  getProductByShopId,
  getProductByCateoryID,
  updateProduct,
  searchProduct,
  updateStatusProduct,
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

import {
  createChat,
  getShopMessages,
  getShopsChattedWithCustomer,
  searchShop,
  getCustomerChattedWithShop,
  searchCustomer,
} from "../app/controllers/chat/chat.controller";
import {
  createRating,
  getRatingByProductId,
  getAvgProductRating,
  getAvgRatingByShopId,
  checkRating,
} from "../app/controllers/rating/rating.controller";
import {
  getTotalCustomer,
  getTotalProduct,
  getTotalOrder,
  getTopCustomers,
  getRecentOrders,
  getAllUser,
} from "../app/controllers/admin/admin.controller";
serviceRouter.put("/change-infor/:customerId", updateCustomerController);
serviceRouter.put(
  "/change-number-phone/:customerId",
  updateNumberPhoneController
);
serviceRouter.put("/change-email/:customerId", updateEmailController);
serviceRouter.put("/change-address/:customerId", updateAddressController);

//shop
serviceRouter.post("/create-shop", createShop);
serviceRouter.put("/update-shop/:shopId", updateShop);
serviceRouter.get("/get-shop/:customerId", getShop);
serviceRouter.get("/get-order-list-by-shop-id/:shopId", getOrderListByShopId);
serviceRouter.get(
  "/get-order-list-by-status/:status/:shopId",
  getOrderListByStatus
);
serviceRouter.get("/get-shop-by-id/:shopId", getShopById);
serviceRouter.get(
  "/get-count-product-by-shop-id/:shopId",
  getCountProductByShopId
);
serviceRouter.get("/get-total-sales-amount/:shopId", getTotalSalesAmount);
serviceRouter.get("/get-average-rating/:shopId", getAverageRating);

//categories
serviceRouter.get("/get-all-categories", getAllCategories);
serviceRouter.post("/create-category", createCategory);
serviceRouter.put("/update-category", updateCategory);
serviceRouter.delete("/delete-category", deleteCategory);
serviceRouter.get("/unused-categories", unusedCategories);

//products
serviceRouter.post("/create-product", createProduct);
serviceRouter.get("/get-all-products", getAllProducts);
serviceRouter.get("/get-all-products-admin", getAllProductsAdmin);

serviceRouter.get("/get-product-by-id/:id", getProductByID);
serviceRouter.get("/get-product-by-category-id/:id", getProductByCateoryID);
serviceRouter.get("/get-product-by-shop-id/:id", getProductByShopId);
serviceRouter.put("/update-product/:id", updateProduct);
serviceRouter.put("/update-status-product/:id", updateStatusProduct);
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

//search
serviceRouter.post("/search-product", searchProduct);

//chat
serviceRouter.post("/create-chat", createChat);
serviceRouter.get("/get-shop-messages/:customerId/:shopId", getShopMessages);
serviceRouter.post("/search-shop", searchShop);
serviceRouter.get(
  "/get-shops-chatted-with-customer/:customerId",
  getShopsChattedWithCustomer
);
serviceRouter.get(
  "/get-customer-chatted-with-shop/:shopId",
  getCustomerChattedWithShop
);
serviceRouter.post("/search-customer", searchCustomer);

//customer
serviceRouter.get(
  "/get-bill-by-customer-id/:customerId",
  getBillByCustomerIdController
);
//rating
serviceRouter.get("/check-rating/:customerId/:productId", checkRating);
serviceRouter.post("/create-rating", createRating);
serviceRouter.get("/get-rating-by-product-id/:productId", getRatingByProductId);
serviceRouter.get("/get-avg-product-rating/:productId", getAvgProductRating);
serviceRouter.get("/get-avg-rating-by-shop-id/:shopId", getAvgRatingByShopId);

//admin
serviceRouter.get("/get-total-customer", getTotalCustomer);
serviceRouter.get("/get-total-product", getTotalProduct);
serviceRouter.get("/get-total-order", getTotalOrder);
serviceRouter.get("/get-top-customers", getTopCustomers);
serviceRouter.get("/get-recent-orders", getRecentOrders);
serviceRouter.get("/get-all-user", getAllUser);

export default serviceRouter;
