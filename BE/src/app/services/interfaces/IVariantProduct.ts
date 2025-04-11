export interface IProductVariant {
  productId: number;
  typeValueId: number;
  quantity: number;
  img: string;
  price: number;
}
export interface IVariantType {
  typeId: number;
  typeName: string;
  categoryId: number;
}
export interface IVariantValue {
  typeValueId: number;
  typeId: number;
  typeValue: string;
}
