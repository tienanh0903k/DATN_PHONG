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

const getAllUser = async (req: Request, res: Response) => {
  const response = await AdminServices.getAllUser();
  res.status(200).json(response);
};
const getAllBill = async (req: Request, res: Response) => {
  const response = await AdminServices.getAllBill();
  res.status(200).json(response);
};
const updateBillStatus = async (req: Request, res: Response) => {
  const { billId } = req.params;
  const { newStatus } = req.body;
  const response = await AdminServices.updateBillStatus(
    Number(billId),
    newStatus
  );
  res.status(200).json(response);
};
export {
  getTotalCustomer,
  getTotalProduct,
  getTotalOrder,
  getTopCustomers,
  getRecentOrders,
  getAllUser,
  getAllBill,
  updateBillStatus,
};
