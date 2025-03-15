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

// const SignIn = async (req: Request, res: Response) => {
//     const data = req.body;
//     try {
//         const result = await AuthService.signIn(data);
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }
export { signUp };
