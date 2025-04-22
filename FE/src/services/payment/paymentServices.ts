import { ServicesBase } from '../servicesBase';

class PaymentServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	getProduct(id: number) {
		return this.service.get(`/get-product/${id}`);
	}
}
export default PaymentServices;
