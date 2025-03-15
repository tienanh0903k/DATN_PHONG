import Prismaclient from "../../../prisma";
import { IAuthen } from "./interfaces/IAuthen";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateRandomString from "../../utils";
const SignUp = async (dataProps: IAuthen) => {
  const existingAccount = await Prismaclient.account.findFirst({
    where: { userName: dataProps.userName },
  });
  if (!existingAccount) {
    const Salt = generateRandomString(16);
    const hashPassword = await bcrypt.hash(dataProps.password + Salt, 10);

    return await Prismaclient.customer.create({
      data: {
        customerName: dataProps.customerName,
        avatar:
          "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
        birthday: new Date("1990-01-01"),
        email: dataProps.userName,
        address: "",
        gender: "",
        status: "active",
        numberPhone: dataProps.numberPhone,
        Account: {
          create: {
            userName: dataProps.userName,
            password: hashPassword,
            accountTypeId: 3,
            status: "active",
            Salt: Salt,
          },
        },
      },
    });
  }
};
const signIn = async () => {};
export { SignUp, signIn };
