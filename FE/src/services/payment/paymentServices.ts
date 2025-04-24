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
	updateBill(billId: number, status: number) {
		return this.service.put('/update-bill', { billId, status });
	}
	createOrderPaylate(data: any) {
		return this.service.post('/create-order-paylate', data);
	}
}
export default PaymentServices;
