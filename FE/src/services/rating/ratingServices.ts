/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesBase } from '../servicesBase';

class RatingServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	checkRating = async (customerId: number, productId: number) => {
		return this.service.get(`/check-rating/${customerId}/${productId}`);
	};
	createRating = async (data: any) => {
		return this.service.post('/create-rating', data);
	};
	getRatingByProductId = async (productId: number) => {
		return this.service.get(`/get-rating-by-product-id/${productId}`);
	};
	getAvgProductRating = async (productId: number) => {
		return this.service.get(`/get-avg-product-rating/${productId}`);
	};
	getAvgRatingByShopId = async (shopId: number) => {
		return this.service.get(`/get-avg-rating-by-shop-id/${shopId}`);
	};
}
export default RatingServices;
