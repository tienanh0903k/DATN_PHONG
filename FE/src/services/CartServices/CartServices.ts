/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesBase } from '../servicesBase';

class CartServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	getCartByCustomerId(customerId: number) {
		return this.service.get(`/get-cart/${customerId}`);
	}

	addToCart(data: any) {
		return this.service.post('/add-to-cart', data);
	}

	deleteCart(cartId: number) {
		return this.service.delete(`/delete-cart/${cartId}`);
	}
}
export default CartServices;
