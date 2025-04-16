export interface IProductForm {
	productName: string;
	categoryId: number;
	productDes: string;
	price: number;
	img: string;
	variants: Array<{
		typeValueId: number;
		quantity: number;
		price: number;
		img: string;
	}>;
}
