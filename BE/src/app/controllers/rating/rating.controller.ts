import ratingServices from "../../services/ratingServices";
import { Request, Response } from "express";

const createRating = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const response = await ratingServices.createRating(data);
    res.status(200).json({
      success: true,
      message: "Rating created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Rating created failed",
      data: error,
    });
  }
};

const getRatingByProductId = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    const response = await ratingServices.getRatingByProductId(
      Number(productId)
    );
    res.status(200).json({
      success: true,
      message: "Rating fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Rating fetched failed",
      data: error,
    });
  }
};

const getAvgProductRating = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    const response = await ratingServices.getAvgProductRating(
      Number(productId)
    );
    res.status(200).json({
      success: true,
      message: "Average rating fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Average rating fetched failed",
      data: error,
    });
  }
};

const getAvgRatingByShopId = async (req: Request, res: Response) => {
  const shopId = req.params.shopId;
  try {
    const response = await ratingServices.getAvgRatingByShopId(Number(shopId));
    res.status(200).json({
      success: true,
      message: "Average rating fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Average rating fetched failed",
      data: error,
    });
  }
};

const checkRating = async (req: Request, res: Response) => {
  const customerId = req.params.customerId;
  const productId = req.params.productId;
  try {
    const response = await ratingServices.checkRating(
      Number(customerId),
      Number(productId)
    );

    res.status(200).json({
      result: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Rating checked failed",
      data: error,
    });
  }
};
export {
  createRating,
  getRatingByProductId,
  getAvgProductRating,
  getAvgRatingByShopId,
  checkRating,
};
