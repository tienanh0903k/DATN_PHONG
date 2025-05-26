import AdminServices from "../../services/AdminServices";
import { Request, Response } from "express";

const getTotalCustomer = async (req: Request, res: Response) => {
  try {
    const totalCustomer = await AdminServices.getTotalCustomer();
    res.status(200).json(totalCustomer);
  } catch (error) {
    res.status(500).json({ error: "error get total customer" });
  }
};

const getTotalProduct = async (req: Request, res: Response) => {
  try {
    const totalProduct = await AdminServices.getTotalProduct();
    res.status(200).json(totalProduct);
  } catch (error) {
    res.status(500).json({ error: "error get total product" });
  }
};

const getTotalOrder = async (req: Request, res: Response) => {
  try {
    const totalOrder = await AdminServices.getTotalOrder();
    res.status(200).json(totalOrder);
  } catch (error) {
    res.status(500).json({ error: "error get total order" });
  }
};

const getTopCustomers = async (req: Request, res: Response) => {
  try {
    const topCustomers = await AdminServices.getTopCustomers();
    res.status(200).json(topCustomers);
  } catch (error) {
    res.status(500).json({ error: "error get top customers" });
  }
};

const getRecentOrders = async (req: Request, res: Response) => {
  try {
    const recentOrders = await AdminServices.getRecentOrders();
    res.status(200).json(recentOrders);
  } catch (error) {
    res.status(500).json({ error: "error get recent orders" });
  }
};
export {
  getTotalCustomer,
  getTotalProduct,
  getTotalOrder,
  getTopCustomers,
  getRecentOrders,
};
