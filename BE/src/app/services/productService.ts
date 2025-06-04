import { IProducts } from "./interfaces/IProducts";

import Prismaclient from "../../../prisma";
import { getProductByID } from "../controllers/products/products.controller";

const ProductService = {
  createProduct: async (product: any) => {
    try {
      // Kiểm tra trạng thái shop trước
      const shop = await Prismaclient.shop.findUnique({
        where: {
          shopId: product.shopId,
        },
        select: {
          status: true,
        },
      });

      if (!shop) {
        throw new Error("Shop không tồn tại");
      }

      if (shop.status !== "active") {
        throw new Error(
          "Shop không hoạt động. Vui lòng liên hệ admin để được duyệt."
        );
      }

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
      throw error;
    }
  },
  getAllProducts: async () => {
    try {
      const products = await Prismaclient.products.findMany({
        where: {
          status: "active",
        },
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
      const productData = products.map((product) => ({
        ...product,
        categoryName: product.Categories.categoryName,
        shopName: product.Shop.shopName,
        shopEmail: product.Shop.emailShop,
        imgShop: product.Shop.shopAvatar,
      }));
      return productData;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },
  getAllProductsAdmin: async () => {
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
      const productData = products.map((product) => ({
        ...product,
        categoryName: product.Categories.categoryName,
        shopName: product.Shop.shopName,
        shopEmail: product.Shop.emailShop,
        imgShop: product.Shop.shopAvatar,
      }));
      return productData;
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
        },
      });
      const productVariant = await Prismaclient.productVariant.findMany({
        where: { productId },
        include: {
          VariantValue: {
            include: {
              VariantType: true,
            },
          },
        },
      });
      const dataformat = {
        ...product,
        ...product?.Shop,
        ...product?.Categories,
        productVariant: productVariant.map((item) => ({
          ...item,
          ...item.VariantValue,
          ...item.VariantValue.VariantType,
        })),
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
    try {
      const products = await Prismaclient.products.findMany({
        where: { shopId: shopId },
        include: {
          Categories: true,
          Shop: true,
        },
      });
      const productData = products.map((product) => ({
        ...product,
        ...product.Categories,
        ...product.Shop,
      }));
      return productData;
    } catch (error) {
      console.error("Error fetching products by shop ID:", error);
      throw new Error("Failed to fetch products by shop ID");
    }
  },
  updateProduct: async (productId: number, product: any) => {
    try {
      const updatedProduct = await Prismaclient.products.update({
        where: { productId },
        data: {
          productName: product.productName,
          productDes: product.productDes,
          price: parseInt(product.price),
          img: product.img,
          Categories: {
            connect: {
              categoryId: parseInt(product.categoryId),
            },
          },
        },
      });
      let updateVariant: any;
      for (const variant of product.variants) {
        updateVariant = await Prismaclient.productVariant.update({
          where: { id: variant.id },
          data: {
            typeValueId: parseInt(variant.typeValueId),
            quantity: parseInt(variant.quantity),
            price: parseInt(variant.price),
            img: variant.img,
          },
        });
      }
      const data = {
        ...updatedProduct,
        ...updateVariant,
      };
      return data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  },
  searchProduct: async (search: string) => {
    try {
      const product = await Prismaclient.products.findMany({
        where: {
          productName: {
            contains: search,
          },
        },
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
      console.error("Error searching product:", error);
      throw new Error("Failed to search product");
    }
  },
  updateStatusProduct: async (productId: number, status: string) => {
    try {
      const updatedProduct: any = await Prismaclient.products.update({
        where: { productId },
        data: { status },
      });

      return updatedProduct;
    } catch (error) {
      console.error("Error updating product status:", error);
      throw new Error("Failed to update product status");
    }
  },
};

export default ProductService;
