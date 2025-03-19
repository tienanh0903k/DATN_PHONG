import express from "express";
import {
  signUp,
  loginGoogleController,
  callbackGoogleController,
} from "../app/controllers/auth/auth.controller";

const authRouters = express.Router();

authRouters.post("/signup", signUp);

authRouters.get("/login/google", loginGoogleController);
authRouters.get("/callback/google/:code", callbackGoogleController);

export default authRouters;
