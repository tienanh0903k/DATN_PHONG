/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesBase } from '../servicesBase';

class VariantService extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	createVariantType(data: any) {
		return this.service.post('/create-variant-type', data);
	}
	getVariantType() {
		return this.service.get('/get-variant-type');
	}

	updateVariantType(data: any) {
		return this.service.put('/update-variant-type', data);
	}
	getVariantValue() {
		return this.service.get('/get-variant-value');
	}
	createVariantValue(data: any) {
		return this.service.post('/create-variant-value', data);
	}
	updateVariantValue(data: any) {
		return this.service.put('/update-variant-value', data);
	}
	getProductVariantByCategoryId(categoryId: number) {
		return this.service.get(`/get-product-variant-by-category-id/${categoryId}`);
	}
	getProductVariantByTypeId(typeId: number) {
		return this.service.get(`/get-product-variant-by-type-id/${typeId}`);
	}
}

export default VariantService;
