import { IProducts } from "./interfaces/IProducts";

import Prismaclient from "../../../prisma";

const ProductService = {
  createProduct: async (product: any) => {
    try {
      const createProduct = await Prismaclient.products.create({
        data: {
          productName: product.productName,
          productDes: product.productDes,
          price: parseInt(product.price),
          img: product.img,

          Shop: {
            connect: {
              shopId: product.shopId,
            },
          },
          Categories: {
            connect: {
              categoryId: parseInt(product.categoryId),
            },
          },
        },
      });
      const productVariant = product.variants.map((variant: any) => ({
        productId: createProduct.productId,
        typeValueId: parseInt(variant.typeValueId),
        quantity: parseInt(variant.quantity),
        price: parseInt(variant.price),
        img: variant.img,
      }));
      await Prismaclient.productVariant.createMany({
        data: productVariant,
      });
      return createProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  },
};

export default ProductService;
