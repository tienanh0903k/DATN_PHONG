import { Response, Request } from "express";
import ProductVariantService from "../../services/ProductVariantServices";

const createVariantType = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const response = await ProductVariantService.createVariantType(data);
    res.status(200).json({
      message: "Create variant type successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create variant type failed",
      error: error,
    });
  }
};
const getVariantType = async (req: Request, res: Response) => {
  try {
    const response = await ProductVariantService.getVariantType();
    res.status(200).json({
      message: "Get variant type successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get variant type failed",
      error: error,
    });
  }
};
const updateVariantType = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const response = await ProductVariantService.updateVariantType(data);
    res.status(200).json({
      message: "Update variant type successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update variant type failed",
      error: error,
    });
  }
};

const createVariantValue = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const response = await ProductVariantService.createVariantValue(data);
    res.status(200).json({
      message: "Create variant value successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create variant value failed",
      error: error,
    });
  }
};
const getVariantValue = async (req: Request, res: Response) => {
  try {
    const response = await ProductVariantService.getVariantValue();
    res.status(200).json({
      message: "Get variant value successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get variant value failed",
      error: error,
    });
  }
};
const updateVariantValue = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const response = await ProductVariantService.updateVariantValue(data);
    res.status(200).json({
      message: "Update variant value successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update variant value failed",
      error: error,
    });
  }
};
const createProductVariant = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const response = await ProductVariantService.createProductVariant(data);
    res.status(200).json({
      message: "Create product variant successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create product variant failed",
      error: error,
    });
  }
};

export {
  createVariantType,
  updateVariantType,
  createVariantValue,
  updateVariantValue,
  createProductVariant,
  getVariantType,
  getVariantValue,
};
