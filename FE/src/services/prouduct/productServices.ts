import { ServicesBase } from '../servicesBase';
import { IProductForm } from '@/models/Shop/createProduct.model';
class ProductServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	createProduct(data: IProductForm) {
		console.log('data', data);
		return this.service.post('/create-product', data);
	}
}
export default ProductServices;
