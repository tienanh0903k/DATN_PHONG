import { ICategory } from '../admin/category.model';

export interface ICategoriesState {
	categories: ICategory[];
}

export const ICategoryData: Readonly<ICategoriesState> = {
	categories: [
		{
			categoryId: 0,
			categoryName: '',
			parentCategoryId: null,
			status: '',
		},
	],
};
