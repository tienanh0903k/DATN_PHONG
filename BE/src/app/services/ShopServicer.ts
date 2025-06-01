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
      if (shop) {
        await Prismaclient.account.update({
          where: {
            accountId: (
              await Prismaclient.customer.findUnique({
                where: { customerId: Number(data.customerId) },
              })
            )?.accountId,
          },
          data: {
            accountTypeId: 2,
          },
        });
      }
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
                  Products: {
                    include: {
                      Shop: true,
                    },
                  },
                  VariantValue: true,
                },
              },
            },
          },
          Customer: true,
          StatusBill: true,
        },
        orderBy: {
          createAt: "desc",
        },
      });
      const bill = bills.map((bill) => {
        return {
          ...bill,
          ...bill.BillDetail[0].ProductVariant.Products.Shop,
          productName: bill.BillDetail[0].ProductVariant.Products.productName,
          quantityBill: bill.BillDetail[0].quantity,
          ...bill.StatusBill,
          ...bill.Customer,
          ...bill.BillDetail[0],
          ...bill.BillDetail[0].ProductVariant,
          ...bill.BillDetail[0].ProductVariant.VariantValue,
        };
      });
      return bill;
    } catch (error) {
      console.log(error);
    }
  },
  getOrderListByStatus: async (data: any) => {
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
                  Products: {
                    include: {
                      Shop: true,
                    },
                  },
                  VariantValue: true,
                },
              },
            },
          },
          Customer: true,
          StatusBill: true,
        },
      });
      const bill = bills.map((bill) => {
        return {
          ...bill,
          ...bill.BillDetail[0].ProductVariant.Products.Shop,
          ...bill.BillDetail[0].ProductVariant.Products,
          ...bill.StatusBill,
          ...bill.Customer,
          ...bill.BillDetail[0].ProductVariant,
          ...bill.BillDetail[0].ProductVariant.VariantValue,
        };
      });
      return bill;
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
  getCountProductByShopId: async (shopId: number) => {
    try {
      const count = await Prismaclient.products.count({
        where: { shopId },
      });
      return count;
    } catch (err) {
      console.log(err);
    }
  },
  getTotalSalesAmount: async (shopId: number) => {
    try {
      const totalSales = await Prismaclient.billDetail.aggregate({
        where: {
          ProductVariant: {
            Products: {
              shopId: shopId,
            },
          },
          Bill: {
            statusId: {
              not: 5,
            },
          },
        },
        _sum: {
          totalPrice: true,
        },
      });

      return totalSales._sum.totalPrice || 0;
    } catch (err) {
      console.log(err);
      return 0;
    }
  },
  getAverageRating: async (shopId: number) => {
    try {
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
        select: {
          ratingValue: true,
        },
      });

      if (ratings.length === 0) {
        return {
          averageRating: 0,
          totalRatings: 0,
        };
      }

      const totalRating = ratings.reduce(
        (sum, rating) => sum + rating.ratingValue,
        0
      );
      const averageRating = totalRating / ratings.length;

      console.log(
        "Calculated average rating:",
        averageRating,
        "from",
        ratings.length,
        "ratings"
      );

      return {
        averageRating: Number(averageRating.toFixed(1)),
        totalRatings: ratings.length,
      };
    } catch (err) {
      console.log("Error calculating average rating:", err);
      return {
        averageRating: 0,
        totalRatings: 0,
      };
    }
  },
};

export default ShopServicer;
