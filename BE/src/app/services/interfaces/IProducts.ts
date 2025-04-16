import { IProductVariant } from "./IVariantProduct";

export interface IProducts {
  productName: string;
  categoryId: number;
  productDes: string;
  shopId: number;
  img: string;
  price: number;
  variants: IProductVariant[];
}
