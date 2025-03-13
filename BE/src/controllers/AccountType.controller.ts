import { Request, Response } from "express";
import * as AccountTypeService from "../services/AccountTypeService";

const createAccountType = async (req: Request, res: Response) => {
  const accountTypeName = req.body;
  try {
    const NewAccountType = await AccountTypeService.createAccountType(
      accountTypeName
    );
    res.status(201).json(NewAccountType);
  } catch (error) {
    res.status(400).json(error);
  }
};
