/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesBase } from '../servicesBase';

class ServicesChat extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	createChat(data: any) {
		return this.service.post('/create-chat', data);
	}
	getShopMessages(customerId: number, shopId: number) {
		return this.service.get(`/get-shop-messages/${customerId}/${shopId}`);
	}
	searchShop(search: string) {
		return this.service.post('/search-shop', { search });
	}
	getShopsChattedWithCustomer(customerId: number) {
		return this.service.get(`/get-shops-chatted-with-customer/${customerId}`);
	}
	getCustomerChattedWithShop(shopId: number) {
		return this.service.get(`/get-customer-chatted-with-shop/${shopId}`);
	}
	searchCustomer(search: string) {
		return this.service.post('/search-customer', { search });
	}
}

export default ServicesChat;
