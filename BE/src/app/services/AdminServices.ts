import Prismaclient from "../../../prisma";

const AdminServices = {
  getTotalCustomer: async () => {
    const totalCustomer = await Prismaclient.customer.count();
    return totalCustomer;
  },
  getTotalProduct: async () => {
    const totalProduct = await Prismaclient.products.count();
    return totalProduct;
  },
  getTotalOrder: async () => {
    const totalOrder = await Prismaclient.billDetail.count();
    return totalOrder;
  },
  getTopCustomers: async () => {
    try {
      const topCustomers = await Prismaclient.customer.findMany({
        select: {
          customerId: true,
          customerName: true,
          email: true,
          avatar: true,
          Bill: {
            select: {
              BillDetail: {
                select: {
                  totalPrice: true,
                  quantity: true,
                },
              },
            },
          },
        },
        take: 5,
        orderBy: {
          Bill: {
            _count: "desc",
          },
        },
      });

      const formattedCustomers = topCustomers.map((customer) => {
        const totalAmount = customer.Bill.reduce((sum, bill) => {
          return (
            sum +
            bill.BillDetail.reduce(
              (billSum, detail) => billSum + detail.totalPrice,
              0
            )
          );
        }, 0);

        const totalOrders = customer.Bill.length;

        return {
          customerId: customer.customerId,
          customerName: customer.customerName,
          email: customer.email,
          avatar: customer.avatar,
          totalAmount,
          totalOrders,
        };
      });

      return formattedCustomers.sort((a, b) => b.totalAmount - a.totalAmount);
    } catch (error) {
      console.error("Error getting top customers:", error);
      throw error;
    }
  },
  getRecentOrders: async () => {
    try {
      const recentOrders = await Prismaclient.bill.findMany({
        take: 5,
        orderBy: {
          billId: "desc",
        },
        include: {
          Customer: {
            select: {
              customerName: true,
              email: true,
              avatar: true,
            },
          },
          BillDetail: {
            include: {
              ProductVariant: {
                include: {
                  Products: {
                    select: {
                      productName: true,
                      img: true,
                    },
                  },
                  VariantValue: true,
                },
              },
            },
          },
          StatusBill: true,
        },
      });

      const formattedOrders = recentOrders.map((order) => {
        const totalAmount = order.BillDetail.reduce(
          (sum, detail) => sum + detail.totalPrice,
          0
        );
        const totalItems = order.BillDetail.reduce(
          (sum, detail) => sum + detail.quantity,
          0
        );

        return {
          billId: order.billId,
          customerName: order.Customer.customerName,
          customerEmail: order.Customer.email,
          customerAvatar: order.Customer.avatar,
          status: order.StatusBill.statusName,
          address: order.address,
          phone: order.numberPhone,
          totalAmount,
          totalItems,
          items: order.BillDetail.map((detail) => ({
            productName: detail.ProductVariant.Products.productName,
            productImage: detail.ProductVariant.Products.img,
            variant: detail.ProductVariant.VariantValue.typeValue,
            quantity: detail.quantity,
            price: detail.totalPrice,
          })),
        };
      });

      return formattedOrders;
    } catch (error) {
      console.error("Error getting recent orders:", error);
      throw error;
    }
  },
  getAllUser: async () => {
    try {
      const res = await Prismaclient.customer.findMany({
        where: {
          Account: {
            accountTypeId: 3,
          },
        },
        include: {
          Account: {
            include: {
              AccountType: true,
            },
          },
        },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  getAllBill: async () => {
    try {
      const res = await Prismaclient.bill.findMany({
        include: {
          Customer: true,
          StatusBill: true,
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
      return res;
    } catch (err) {
      console.log(err);
    }
  },
  updateBillStatus: async (billId: number, newStatus: number) => {
    try {
      const res = await Prismaclient.bill.update({
        where: { billId },
        data: { statusId: newStatus },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};

export default AdminServices;
