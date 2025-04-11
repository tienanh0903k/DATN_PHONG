import { Request, Response } from "express";
import ProductService from "../../services/productService";

const createProduct = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const response = await ProductService.createProduct(data);
    res.status(200).json({
      message: "Create product successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create product failed",
      error: error,
    });
  }
};

export { createProduct };
