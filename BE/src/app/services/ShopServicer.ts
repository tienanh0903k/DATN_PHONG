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
  updateShop: async (shopId: number, data: any) => {
    try {
      const shop = await Prismaclient.shop.update({
        where: { shopId },
        data: {
          shopName: data.shopName,
          shopAddress: data.shopAddress,
          shopAvatar: data.shopAvatar,
          shopBanner: data.shopBanner,
          shopNumberPhone: data.shopNumberPhone,
          emailShop: data.emailShop,
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
  getOrderListByStatus: async (data: any) => {
    console.log(data);
    try {
      const bills = await Prismaclient.bill.findMany({
        where: {
          statusId: parseInt(data.status),
          BillDetail: {
            some: {
              ProductVariant: {
                Products: {
                  shopId: parseInt(data.shopId),
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
  getStatusOder: async () => {
    try {
      const response = await Prismaclient.statusBill.findMany();
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getShopById: async (shopId: number) => {
    try {
      const shop = await Prismaclient.shop.findUnique({
        where: { shopId },
        include: { Follower: true },
      });

      const ratings = await Prismaclient.rating.findMany({
        where: {
          BillDetail: {
            ProductVariant: {
              Products: {
                shopId: shopId,
              },
            },
          },
        },
      });
      const productByShop = await Prismaclient.products.findMany({
        where: {
          shopId,
        },
      });
      const productCount = await Prismaclient.products.count({
        where: { shopId: shopId },
      });

      const followerCount = shop?.Follower.length || 0;
      const totalRatings = ratings.length;
      const avgRating =
        totalRatings > 0
          ? ratings.reduce((sum, r) => sum + r.ratingValue, 0) / totalRatings
          : 0;

      return {
        ...shop,
        followerCount,
        totalRatings,
        avgRating,
        productCount,
        productByShop,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default ShopServicer;
