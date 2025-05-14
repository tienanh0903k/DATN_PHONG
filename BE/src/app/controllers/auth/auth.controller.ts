import { Request, Response } from "express";
import * as AuthService from "../../services/AuthenServices";

const signUp = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const result = await AuthService.SignUp(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const loginGoogleController = async (req: Request, res: Response) => {
  const redirectTo = req.query.redirect_to as string;

  try {
    const result = await AuthService.loginGoogle(redirectTo);

    res.json(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const callbackGoogleController = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    if (!code) {
      res.status(400).json({ error: "Không có code từ Google." });
    }

    const result = await AuthService.handleGoogleCallback(code);

    res.json({
      data: result.user,
    });
  } catch (error) {
    console.error("Lỗi callback Google:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const sendOtpEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await AuthService.sendOtp(email);
  res.status(200).json(result);
};
const verifyOtpEmail = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const result = await AuthService.verifyOtp(email, otp);
  res.status(200).json(result);
};
const SignIn = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await AuthService.signIn(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
const Login = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const response = await AuthService.login(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
const getCustomer = async (req: Request, res: Response) => {
  res.json(req.customer);
};
export {
  signUp,
  loginGoogleController,
  callbackGoogleController,
  sendOtpEmail,
  verifyOtpEmail,
  SignIn,
  Login,
  getCustomer,
};
