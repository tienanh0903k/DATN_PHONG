import express from "express";
import {
  signUp,
  loginGoogleController,
  callbackGoogleController,
  sendOtpEmail,
  verifyOtpEmail,
  SignIn,
} from "../app/controllers/auth/auth.controller";

const authRouters = express.Router();

authRouters.post("/signup", signUp);

authRouters.get("/login/google", loginGoogleController);
authRouters.get("/callback/google/:code", callbackGoogleController);
authRouters.post("/send-otp", sendOtpEmail);
authRouters.post("/verify-otp", verifyOtpEmail);
authRouters.post("/signin", SignIn);
export default authRouters;
