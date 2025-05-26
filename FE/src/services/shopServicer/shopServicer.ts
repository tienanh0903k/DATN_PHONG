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
	updateShop(data: any) {
		return this.service.put(`/update-shop/${data.shopId}`, data);
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
	getShopById(shopId: number) {
		return this.service.get(`/get-shop-by-id/${shopId}`);
	}
	getCountProductByShopId(shopId: number) {
		return this.service.get(`/get-count-product-by-shop-id/${shopId}`);
	}
	getTotalSalesAmount(shopId: number) {
		return this.service.get(`/get-total-sales-amount/${shopId}`);
	}
	getAverageRating(shopId: number) {
		return this.service.get(`/get-average-rating/${shopId}`);
	}
}
export default ShopServicer;
