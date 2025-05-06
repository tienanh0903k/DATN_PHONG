/* eslint-disable @typescript-eslint/no-explicit-any */

import { ServicesBase } from '../servicesBase';

class ShopServicer extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	getShop(customerId: number) {
		return this.service.get(`/get-shop/${customerId}`);
	}
	createShop(data: any) {
		return this.service.post(`/create-shop`, data);
	}
	getOrderListByShopId(shopId: number) {
		return this.service.get(`/get-order-list-by-shop-id/${shopId}`);
	}
	getOderbyStatus(data: any) {
		return this.service.get(`get-order-list-by-status/${data.status}/${data.shopId}`);
	}
	getStatusOder() {
		return this.service.get('/getstatus-order');
	}
}
export default ShopServicer;
