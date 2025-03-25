import express from "express";
import {
  updateNumberPhoneController,
  updateEmailController,
  updateAddressController,
  updateCustomerController,
} from "../app/controllers/customer/customer.controller";
const serviceRouter = express.Router();

serviceRouter.put("/change-infor/:customerId", updateCustomerController);
serviceRouter.put(
  "/change-number-phone/:customerId",
  updateNumberPhoneController
);
serviceRouter.put("/change-email/:customerId", updateEmailController);
serviceRouter.put("/change-address/:customerId", updateAddressController);

export default serviceRouter;
