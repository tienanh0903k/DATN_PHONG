import PrismaClient from "../../../prisma";
import { IRating } from "./interfaces/IRating";

const ratingServices = {
  createRating: async (rating: IRating) => {
    const response = await PrismaClient.rating.create({
      data: rating,
    });
    return response;
  },
  getRatingByProductId: async (productId: number) => {
    const response = await PrismaClient.rating.findMany({
      where: {
        BillDetail: {
          is: {
            ProductVariant: {
              productId: productId,
            },
          },
        },
      },
      include: {
        Customer: true,
      },
    });
    return response;
  },
  getAvgProductRating: async (productId: number) => {
    const result = await PrismaClient.rating.aggregate({
      _avg: { ratingValue: true },
      where: {
        BillDetail: {
          is: {
            ProductVariant: { productId },
          },
        },
      },
    });

    return result._avg.ratingValue ?? 0;
  },
  getAvgRatingByShopId: async (shopId: number) => {
    const result = await PrismaClient.rating.aggregate({
      _avg: { ratingValue: true },
      where: {
        BillDetail: {
          is: {
            ProductVariant: {
              Products: {
                shopId: shopId,
              },
            },
          },
        },
      },
    });
    return result._avg.ratingValue ?? 0;
  },
  checkRating: async (customerId: number, productId: number) => {
    const billDetail = await PrismaClient.billDetail.findFirst({
      where: {
        Bill: {
          customerId,
          NOT: {
            statusId: 5,
          },
        },
        ProductVariant: {
          productId,
        },
      },
      include: {
        Rating: true,
      },
    });

    return {
      hasPurchased: !!billDetail,
      hasRated: !!billDetail?.Rating,
      billDetailId: billDetail?.billDetailId,
    };
  },
};
export default ratingServices;
