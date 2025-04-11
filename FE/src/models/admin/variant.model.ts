export interface IVariantType {
	typeId: number;
	typeName: string;
	categoryId: number;
	categoryName: string;
}

export interface IVariantValue {
	typeValueId: number;
	typeId: number;
	typeValue: string;
	typeName: string;
}
