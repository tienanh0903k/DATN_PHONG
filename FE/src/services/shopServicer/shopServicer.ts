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
}
export default ShopServicer;
