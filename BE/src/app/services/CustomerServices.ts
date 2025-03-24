import { ICustomerType } from "./interfaces/ICustomerType";
import Prismaclient from "../../../prisma";

const customerServices = {
  updateCustomer: async (customerId: number, customerData: ICustomerType) => {
    const customer = await Prismaclient.customer.update({
      where: {
        customerId: customerId,
      },
      data: {
        customerName: customerData.customerName,
        nickName: customerData.nickName,
        birthday: customerData.birthday,
        gender: customerData.gender,
      },
    });
    return customer;
  },
  updateNumberPhone: async (customerId: number, data: any) => {
    const customer = await Prismaclient.customer.update({
      where: { customerId },
      data: { numberPhone: data.numberPhone },
    });
    return customer;
  },
  updateEmail: async (customerId: number, data: any) => {
    const customer = await Prismaclient.customer.update({
      where: { customerId },
      data: { email: data.email },
    });
    return customer;
  },
};

export { customerServices };
