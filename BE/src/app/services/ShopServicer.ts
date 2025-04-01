import Prismaclient from "../../../prisma";
import { ICreateShopForm } from "./interfaces/IShopTypeServicer";

const ShopServicer = {
  getShop: async (customerId: number) => {
    try {
      const shop = await Prismaclient.shop.findUnique({
        where: { customerId },
      });
      return shop;
    } catch (error) {
      console.log(error);
    }
  },
  createShop: async (data: ICreateShopForm) => {
    try {
      const shop = await Prismaclient.shop.create({
        data: {
          shopName: data.shopName,
          shopAddress: data.shopAddress,
          shopAvatar: data.shopAvatar,
          shopBanner: data.shopBanner,
          shopNumberPhone: data.shopNumberPhone,
          emailShop: data.emailShop,
          customerId: Number(data.customerId),
          totalSales: 0,
          totalProduct: 0,
          status: "active",
        },
      });
      return shop;
    } catch (error) {
      console.log(error);
    }
  },
};

export default ShopServicer;
