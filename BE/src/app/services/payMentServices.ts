import Prismaclient from "../../../prisma";

const PayMentServices = {
  getproduct: async (id: number) => {
    try {
      const productVariant = await Prismaclient.productVariant.findUnique({
        where: { id: id },
        include: {
          Products: true,
          VariantValue: true,
        },
      });
      const formatProductVariant = {
        ...productVariant,
        ...productVariant?.Products,
        ...productVariant?.VariantValue,
      };
      return formatProductVariant;
    } catch (error) {
      throw new Error("Failed to get product variant");
    }
  },
  createOrderPaylate: async (data: any) => {
    try {
      const bill = await Prismaclient.bill.create({
        data: {
          customerId: data.customerId,
          numberPhone: data.numberPhone,
          address: data.address,
          statusId: 6,
          BillDetail: {
            create: data.cartItems.map((item: any) => ({
              id: item.id,
              quantity: item.quantity,
              totalPrice: item.totalPrice,
            })),
          },
        },
      });

      for (const item of data.cartItems) {
        await Prismaclient.productVariant.update({
          where: { id: item.id },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return bill;
    } catch (error) {
      throw new Error("Failed to create order paylater");
    }
  },
  updateBill: async (billId: number, status: number) => {
    try {
      const bill = await Prismaclient.bill.update({
        where: { billId: billId },
        data: { statusId: status },
      });
      return bill;
    } catch (error) {
      throw new Error("Failed to update bill");
    }
  },

  handlePaymentFailure: async (billId: number) => {
    try {
      const billDetails = await Prismaclient.billDetail.findMany({
        where: { billId: billId },
        include: {
          ProductVariant: true,
        },
      });

      for (const detail of billDetails) {
        await Prismaclient.productVariant.update({
          where: { id: detail.id },
          data: {
            quantity: {
              increment: detail.quantity,
            },
          },
        });
      }

      await Prismaclient.bill.update({
        where: { billId: billId },
        data: { statusId: 5 },
      });
    } catch (error) {
      throw new Error("Failed to handle payment failure");
    }
  },
};
export default PayMentServices;
