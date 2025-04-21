export interface ICart {
	cart: {
		cartId: number;
		customerId: number;
		id: number;
		quantity: number;
	}[];
}
export const defaultvalue: Readonly<ICart> = {
	cart: [],
};
