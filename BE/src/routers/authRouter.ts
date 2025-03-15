import express from "express";
const authRouters = express.Router();
import { signUp } from "../app/controllers/auth/auth.controller";
export default authRouters;

authRouters.post("/signup", signUp);
