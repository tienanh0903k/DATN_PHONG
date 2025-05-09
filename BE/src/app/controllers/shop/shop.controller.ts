import ShopServicer from "../../services/ShopServicer";
import { Request, Response } from "express";
import { ICreateShopForm } from "../../services/interfaces/IShopTypeServicer";

const createShop = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ICreateShopForm = req.body;
    const shop = await ShopServicer.createShop(data);
    res.status(200).json({
      message: "Shop created successfully",
      shop,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateShop = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shopId } = req.params;
    const data = req.body;
    const shop = await ShopServicer.updateShop(Number(data.shopId), data);
    res.status(200).json({
      message: "Shop updated successfully",
      shop,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getShop = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.params;
    const shop = await ShopServicer.getShop(Number(customerId));
    res.status(200).json({
      message: "Shop fetched successfully",
      shop,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderListByShopId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { shopId } = req.params;
    const orderList = await ShopServicer.getOrderListByShopId(Number(shopId));
    res.status(200).json({
      message: "Order list fetched successfully",
      data: orderList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderListByStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.params;

    const orderList = await ShopServicer.getOrderListByStatus(data);
    res.status(200).json({
      data: orderList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getStatusOder = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await ShopServicer.getStatusOder();
    res.status(200).json({
      data: response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getShopById = async (req: Request, res: Response): Promise<void> => {
  const { shopId } = req.params;
  try {
    const response = await ShopServicer.getShopById(Number(shopId));
    res.status(200).json({
      data: response,
    });
  } catch (err) {
    console.log(err);
  }
};

export {
  createShop,
  getShop,
  getOrderListByShopId,
  getOrderListByStatus,
  getStatusOder,
  updateShop,
  getShopById,
};
