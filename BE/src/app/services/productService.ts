import { IProducts } from "./interfaces/IProducts";

import Prismaclient from "../../../prisma";

const ProductService = {
  createProduct: async (product: IProducts) => {
    const response = await Prismaclient.products.create({
      data: product,
    });
    return response;
  },
};

export default ProductService;
