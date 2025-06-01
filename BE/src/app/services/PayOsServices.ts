import PrismaClient from "../../../prisma";
import PayOS from "@payos/node";

const PAYOS_CLIENT_ID = process.env.ClientID!;
const PAYOS_API_KEY = process.env.APIKey!;
const PAYOS_CHECKSUM_KEY = process.env.ChecksumKey!;

const payOS = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);

export const PayOsServices = {
  createOrder: async (data: any) => {
    try {
      const bill = await PrismaClient.bill.create({
        data: {
          customerId: data.customerId,
          numberPhone: data.numberPhone,
          address: data.address,
          statusId: 1,
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
        await PrismaClient.productVariant.update({
          where: { id: item.id },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      const paymentLinkResponse = await payOS.createPaymentLink({
        orderCode: bill.billId,
        amount: 5000,
        // amount: data.cartItems.reduce(
        //   (acc: number, item: any) => acc + item.totalPrice,
        //   0
        // ),
        description: `Thanh toán hóa đơn #${bill.billId}`,
        returnUrl: `http://localhost:3000/checkout/success?billId=${bill.billId}`,
        cancelUrl: `http://localhost:3000/checkout/failure?billId=${bill.billId}`,
        items: data.cartItems.map((item: any) => ({
          name: item.name || `Sản phẩm #${item.id}`,
          quantity: item.quantity,
          price: item.totalPrice,
        })),
      });
      return {
        billId: bill.billId,
        checkoutUrl: paymentLinkResponse.checkoutUrl,
      };
    } catch (err) {
      console.error("Lỗi tạo đơn thanh toán:", err);
      throw new Error("Không thể tạo đơn thanh toán");
    }
  },
};
