import express from "express";
import {
  updateNumberPhoneController,
  updateEmailController,
} from "../app/controllers/customer/customer.controller";
const serviceRouter = express.Router();

serviceRouter.put(
  "/change-number-phone/:customerId",
  updateNumberPhoneController
);
serviceRouter.put("/change-email/:customerId", updateEmailController);

export default serviceRouter;
