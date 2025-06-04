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
	getAllUser() {
		return this.service.get('/get-all-user');
	}
	getAllBill() {
		return this.service.get('/get-all-bill');
	}
	updateStatusShop(shopId: number, status: string) {
		return this.service.put(`/update-status-shop/${shopId}`, { status });
	}
	getAllShop() {
		return this.service.get('/get-all-shop');
	}
	updateBillStatus(billId: number, newStatus: number) {
		return this.service.put(`/update-bill-status/${billId}`, { newStatus });
	}
}

export default AdminServices;
