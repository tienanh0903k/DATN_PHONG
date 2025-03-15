import Prismaclient from "../../../prisma";
import { IAccoutType } from "./interfaces/IAccountTypeService";

export const createAccountType = async (
  AccountTypeName: string
): Promise<IAccoutType> => {
  return await Prismaclient.accountType.create({
    data: {
      accountTypeName: AccountTypeName,
    },
  });
};
export const getAccountType = async (): Promise<IAccoutType[]> => {
  const users = await Prismaclient.accountType.findMany();
  return users;
};
