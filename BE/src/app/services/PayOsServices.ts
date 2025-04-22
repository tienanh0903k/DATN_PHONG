import Prismaclient from "../../../prisma";

const PAYOS_CLIENT_ID = process.env.ClientID!;
const PAYOS_API_KEY = process.env.APIKey!;

const createBillAndPayment = async (data: any) => {
  try {
    const bill = await Prismaclient.bill.create({
      data: {
        customerId: data.customerId,
        numberPhone: data.numberPhone,
        address: data.address,
        status: "PENDING",
        BillDetail: {
          create: data.cartItems.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })),
        },
      },
    });
    const totalAmount = data.cartItems.reduce(
      (sum: number, item: any) => sum + item.totalPrice,
      0
    );
    const response = await fetch("https://api.payos.vn/v1/payment-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Id": PAYOS_CLIENT_ID,
        "Api-Key": PAYOS_API_KEY,
      },
      body: JSON.stringify({
        orderCode: bill.billId,
        amount: totalAmount,
        description: `Thanh toán hóa đơn #${bill.billId}`,
        returnUrl: "https://your-frontend.com/payment-success",
        cancelUrl: "https://your-frontend.com/payment-cancel",
      }),
    });

    const payosRes = await response.json();

    return {
      billId: bill.billId,
      checkoutUrl: payosRes.checkoutUrl,
    };
  } catch (err) {
    console.error("Error in createBillAndPayment:", err);
    throw err;
  }
};
export default { createBillAndPayment };
