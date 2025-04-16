import {
  IProductVariant,
  IVariantType,
  IVariantValue,
} from "./interfaces/IVariantProduct";
import Prismaclient from "../../../prisma";
const VariantServices = {
  createVariantType: async (variantType: IVariantType) => {
    const response = await Prismaclient.variantType.create({
      data: variantType,
    });
    return response;
  },
  getVariantType: async () => {
    const response = await Prismaclient.variantType.findMany({
      include: {
        Categories: true,
      },
    });
    return response;
  },
  updateVariantType: async (variantType: IVariantType) => {
    const response = await Prismaclient.variantType.update({
      where: { typeId: variantType.typeId },
      data: variantType,
    });
    return response;
  },
  getVariantValue: async () => {
    const response = await Prismaclient.variantValue.findMany({
      include: {
        VariantType: true,
      },
    });
    return response;
  },
  createVariantValue: async (variantValue: IVariantValue) => {
    const response = await Prismaclient.variantValue.create({
      data: variantValue,
    });
    return response;
  },
  updateVariantValue: async (variantValue: IVariantValue) => {
    const response = await Prismaclient.variantValue.update({
      where: { typeValueId: variantValue.typeValueId },
      data: variantValue,
    });
    return response;
  },
  createProductVariant: async (productVariant: IProductVariant) => {
    const response = await Prismaclient.productVariant.create({
      data: productVariant,
    });
    return response;
  },
  getProductVariantByCategoryId: async (categoryId: number) => {
    const response = await Prismaclient.variantType.findMany({
      where: {
        categoryId: categoryId,
      },
    });
    return response;
  },
  getProductVariantByTypeId: async (typeId: number) => {
    const response = await Prismaclient.variantValue.findMany({
      where: {
        typeId: typeId,
      },
    });
    return response;
  },
};
export default VariantServices;
