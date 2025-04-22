import PayMentServices from "../../services/payMentServices";
import PayOsServices from "../../services/PayOsServices";
import { Request, Response } from "express";

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await PayMentServices.getproduct(Number(id));
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
const createBillAndPayment = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const bill = await PayOsServices.createBillAndPayment(data);
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
export { getProduct, createBillAndPayment };
