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
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const response = await ProductService.getAllProducts();
    res.status(200).json({
      message: "Get all products successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get all products failed",
      error: error,
    });
  }
};
const getProductByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await ProductService.getProductById(parseInt(id));
    res.status(200).json({
      message: "Get product by ID successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get product by ID failed",
      error: error,
    });
  }
};
const getProductByCateoryID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await ProductService.getProductByCategoryID(parseInt(id));
    res.status(200).json({
      message: "Get product by category ID successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get product by category ID failed",
      error: error,
    });
  }
};
const getProductByShopId = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log("id", id);
  try {
    const response = await ProductService.getproductByShopId(parseInt(id));
    const dataformat = response.map((item) => {
      return {
        ...item,
        ...item.Shop,
        ...item.Categories,
      };
    });
    res.status(200).json({
      message: "Get product by shop ID successfully",
      data: dataformat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get product by shop ID failed",
      error: error,
    });
  }
};
export {
  createProduct,
  getAllProducts,
  getProductByID,
  getProductByShopId,
  getProductByCateoryID,
};
