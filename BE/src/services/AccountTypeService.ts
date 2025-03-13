import prisma from "../../prisma";
import { IAccoutType } from "./interfaces/IAccountTypeService";

export const createAccountType = async (
  AccountTypeName: string
): Promise<IAccoutType> => {
  return await prisma.accountType.create({
    data: {
      accountTypeName: AccountTypeName,
    },
  });
};
export const getAccountType = async (): Promise<IAccoutType[]> => {
  const users = await prisma.accountType.findMany();
  return users;
};
