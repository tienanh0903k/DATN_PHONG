/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesBase } from '../servicesBase';
import { ICategory } from '@/models/admin/category.model';
import { ICreateCategory } from '@/models/admin/category.model';

class CategoryServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	getAllCategories() {
		return this.service.get('/get-all-categories');
	}
	createCategory(data: ICreateCategory) {
		return this.service.post('/create-category', data);
	}
	updateCategory(data: ICategory) {
		return this.service.put('/update-category', data);
	}
	deleteCategory(data: any) {
		return this.service.delete('/delete-category', data);
	}
	unusedCategories() {
		return this.service.get('/unused-categories');
	}
}
export default CategoryServices;
