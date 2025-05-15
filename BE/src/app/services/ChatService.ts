import Prismaclient from "../../../prisma";

const ChatService = {
  createMessage: async (message: any) => {
    const newMessage = await Prismaclient.message.create({
      data: {
        senderId: parseInt(message.senderId),
        senderType: message.senderType,
        customerId: parseInt(message.customerId),
        shopId: parseInt(message.shopId),
        content: message.content,
      },
    });
    return newMessage;
  },
  getShopMessages: async (data: any) => {
    const messages = await Prismaclient.message.findMany({
      where: {
        OR: [
          {
            customerId: parseInt(data.customerId),
            shopId: parseInt(data.shopId),
          },
          {
            customerId: parseInt(data.customerId),
            shopId: parseInt(data.shopId),
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  },
  searchShop: async (search: string) => {
    const response = await Prismaclient.shop.findMany({
      where: {
        shopName: {
          contains: search,
        },
      },
    });
    return response;
  },
  searchCustomer: async (search: string) => {
    const response = await Prismaclient.customer.findMany({
      where: {
        customerName: {
          contains: search,
        },
      },
    });
    return response;
  },
  getShopsChattedWithCustomer: async (customerId: number) => {
    const shops = await Prismaclient.shop.findMany({
      where: {
        Message: {
          some: {
            customerId: customerId,
          },
        },
      },
      include: {
        Message: {
          where: { customerId },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    return shops;
  },
  getCustomerChattedWithShop: async (shopId: number) => {
    const customers = await Prismaclient.customer.findMany({
      where: {
        Message: {
          some: {
            shopId: shopId,
          },
        },
      },
    });
    return customers;
  },
};
export default ChatService;
