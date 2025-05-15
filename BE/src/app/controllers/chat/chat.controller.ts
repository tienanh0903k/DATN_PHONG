import ChatService from "../../services/ChatService";
import { Request, Response } from "express";

const createChat = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const newMessage = await ChatService.createMessage(data);
    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

const getShopMessages = async (req: Request, res: Response) => {
  try {
    const { customerId, shopId } = req.params;

    const data = {
      customerId: customerId,
      shopId: shopId,
    };
    const messages = await ChatService.getShopMessages(data);
    res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

const searchShop = async (req: Request, res: Response) => {
  try {
    const { search } = req.body;
    const shops = await ChatService.searchShop(String(search));
    res.status(200).json({
      success: true,
      message: "Shops fetched successfully",
      data: shops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

const getShopsChattedWithCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const shops = await ChatService.getShopsChattedWithCustomer(
      Number(customerId)
    );
    res.status(200).json({
      success: true,
      message: "Shops fetched successfully",
      data: shops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

const getCustomerChattedWithShop = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const customers = await ChatService.getCustomerChattedWithShop(
      Number(shopId)
    );
    res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

const searchCustomer = async (req: Request, res: Response) => {
  try {
    const { search } = req.body;
    const customers = await ChatService.searchCustomer(String(search));
    res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export {
  createChat,
  getShopMessages,
  searchShop,
  getShopsChattedWithCustomer,
  getCustomerChattedWithShop,
  searchCustomer,
};
