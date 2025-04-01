import express from "express";
import {
  updateNumberPhoneController,
  updateEmailController,
  updateAddressController,
  updateCustomerController,
} from "../app/controllers/customer/customer.controller";
import { createShop, getShop } from "../app/controllers/shop/shop.controller";
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

export default serviceRouter;
