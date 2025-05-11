import express from "express";
import {
  signUp,
  loginGoogleController,
  callbackGoogleController,
  sendOtpEmail,
  verifyOtpEmail,
  SignIn,
  Login,
  getCustomer,
} from "../app/controllers/auth/auth.controller";
import Middleware from "../middlewares/auth.middlewares";

const authRouters = express.Router();

authRouters.post("/sign-up", signUp);
authRouters.post("/login", Login);
authRouters.get("/login/google", loginGoogleController);
authRouters.get("/callback/google/:code", callbackGoogleController);
authRouters.post("/send-otp", sendOtpEmail);
authRouters.post("/verify-otp", verifyOtpEmail);
authRouters.post("/signin", SignIn);
authRouters.get("/customer", [Middleware], getCustomer);
export default authRouters;
