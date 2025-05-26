import { ServicesBase } from '../servicesBase';

class AdminServices extends ServicesBase {
	constructor(url: string, onAuthenticated: () => void) {
		super(url, onAuthenticated);
	}

	getTotalCustomer() {
		return this.service.get('/get-total-customer');
	}

	getTotalProduct() {
		return this.service.get('/get-total-product');
	}

	getTotalOrder() {
		return this.service.get('/get-total-order');
	}

	getTopCustomers() {
		return this.service.get('/get-top-customers');
	}

	getRecentOrders() {
		return this.service.get('/get-recent-orders');
	}
}

export default AdminServices;
