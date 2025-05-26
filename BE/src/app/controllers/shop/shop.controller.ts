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

const getCountProductByShopId = async (req: Request, res: Response) => {
  const { shopId } = req.params;
  try {
    const response = await ShopServicer.getCountProductByShopId(
      parseInt(shopId)
    );
    res.status(200).json({
      message: "Get count product by shop ID successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalSalesAmount = async (req: Request, res: Response) => {
  const { shopId } = req.params;
  try {
    const response = await ShopServicer.getTotalSalesAmount(parseInt(shopId));
    res.status(200).json({
      message: "Get total sales amount successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAverageRating = async (req: Request, res: Response) => {
  const { shopId } = req.params;
  try {
    const response = await ShopServicer.getAverageRating(parseInt(shopId));
    res.status(200).json({
      message: "Get average rating successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  createShop,
  getShop,
  getOrderListByShopId,
  getOrderListByStatus,
  updateShop,
  getShopById,
  getCountProductByShopId,
  getTotalSalesAmount,
  getAverageRating,
};
