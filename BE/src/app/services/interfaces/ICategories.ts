export interface ICategory {
  categoryId: number;
  categoryName: string;
  parentCategoryId: number | null;
  status: string;
}
