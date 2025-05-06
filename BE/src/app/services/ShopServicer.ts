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
  getOrderListByShopId: async (id: number) => {
    console.log(id);
    try {
      const bills = await Prismaclient.bill.findMany({
        where: {
          BillDetail: {
            some: {
              ProductVariant: {
                Products: {
                  shopId: id,
                },
              },
            },
          },
        },
        include: {
          BillDetail: {
            include: {
              ProductVariant: {
                include: {
                  Products: true,
                  VariantValue: true,
                },
              },
            },
          },
          Customer: true,
          StatusBill: true,
        },
      });
      return bills;
    } catch (error) {
      console.log(error);
    }
  },
  getOrderListByStatus: async (status: number) => {
    try {
      const bills = await Prismaclient.bill.findMany({
        where: { statusId: status },
        include: {
          BillDetail: {
            include: {
              ProductVariant: {
                include: {
                  Products: true,
                },
              },
            },
          },
        },
      });
      return bills;
    } catch (error) {
      console.log(error);
    }
  },
  getStatusOder: async () => {
    try {
      const response = await Prismaclient.statusBill.findMany();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};

export default ShopServicer;
