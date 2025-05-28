import { Response, Request } from "express";
import CartService from "../../services/CartServices";
import { ICartServices } from "../../services/interfaces/ICartServices";
const getCartByCustomerId = async (req: Request, res: Response) => {
  const customerId = req.params.customerId;
  try {
    const cart = await CartService.getCart(Number(customerId));
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};
const addToCart = async (req: Request, res: Response) => {
  const data: ICartServices = req.body;
  try {
    const cart = await CartService.addtocart(data);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};
const deleteCart = async (req: Request, res: Response) => {
  const cartId = req.params.cartId;
  console.log(cartId);
  try {
    await CartService.deleteCart(Number(cartId));
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error });
  }
};
export { getCartByCustomerId, addToCart, deleteCart };
