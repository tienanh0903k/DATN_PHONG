import { IProducts } from "./interfaces/IProducts";

import Prismaclient from "../../../prisma";
import { getProductByID } from "../controllers/products/products.controller";

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
  getAllProducts: async () => {
    try {
      const products = await Prismaclient.products.findMany({
        include: {
          Categories: true,
          Shop: true,
          ProductVariant: {
            include: {
              VariantValue: true,
            },
          },
        },
      });
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },
  getProductById: async (productId: number) => {
    try {
      const product = await Prismaclient.products.findUnique({
        where: { productId },
        include: {
          Categories: true,
          Shop: true,
          ProductVariant: {
            include: {
              VariantValue: true,
            },
          },
        },
      });
      const productVariant = await Prismaclient.productVariant.findMany({
        where: { productId },
        include: {
          VariantValue: true,
        },
      });
      const dataformat = {
        ...product,
        ...product?.Shop,
        ...product?.Categories,
        productVariant: productVariant,
      };
      return dataformat;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new Error("Failed to fetch product by ID");
    }
  },
  getProductByCategoryID: async (categoryId: number) => {
    try {
      const product = await Prismaclient.products.findMany({
        where: { categoryId },
        include: {
          Categories: true,
          Shop: true,
          ProductVariant: {
            include: {
              VariantValue: true,
            },
          },
        },
      });
      return product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new Error("Failed to fetch product by ID");
    }
  },
  getproductByShopId: async (shopId: number) => {
    console.log("shopId", shopId);
    try {
      const products = await Prismaclient.products.findMany({
        where: { shopId: shopId },
        include: {
          Categories: true,
          Shop: true,
        },
      });

      return products;
    } catch (error) {
      console.error("Error fetching products by shop ID:", error);
      throw new Error("Failed to fetch products by shop ID");
    }
  },
};

export default ProductService;
