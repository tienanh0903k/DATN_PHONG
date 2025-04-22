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
};
export default PayMentServices;
