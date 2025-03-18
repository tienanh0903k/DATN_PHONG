import express from "express";
import {
  signUp,
  sendOtpController,
  verifyOtpController,
  loginGoogleController,
  callbackGoogleController,
} from "../app/controllers/auth/auth.controller";

const authRouters = express.Router();

authRouters.post("/signup", signUp);
authRouters.post("/sendotp", sendOtpController);
authRouters.post("/verifyotp", verifyOtpController);
authRouters.get("/login/google", loginGoogleController);
authRouters.get("/callback/google/:code", callbackGoogleController);

export default authRouters;
