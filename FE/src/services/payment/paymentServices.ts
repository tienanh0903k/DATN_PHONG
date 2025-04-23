/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesBase } from '../servicesBase';

class PaymentServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	getProduct(id: number) {
		return this.service.get(`/get-product/${id}`);
	}
	createOrder(data: any) {
		return this.service.post('/create-order', data);
	}
}
export default PaymentServices;
