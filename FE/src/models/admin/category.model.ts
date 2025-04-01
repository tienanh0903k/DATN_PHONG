export interface ICategory {
	categoryId: number;
	categoryName: string;
	parentCategoryId: number | null;
	status: string;
}
export interface ICreateCategory {
	categoryName: string;
	parentCategoryId: number | null;
	status: string;
}
