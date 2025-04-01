import { ICategory } from "./interfaces/ICategories";
import Prismaclient from "../../../prisma";

export const CategoryServices = {
  getAllCategories: async (): Promise<ICategory[]> => {
    const categories = await Prismaclient.categories.findMany();
    return categories;
  },
  createCategory: async (category: ICategory): Promise<ICategory> => {
    const newCategory = await Prismaclient.categories.create({
      data: {
        categoryName: category.categoryName,
        parentCategoryId: category.parentCategoryId,
        status: category.status,
      },
    });
    return newCategory;
  },
  updateCategory: async (category: ICategory): Promise<ICategory> => {
    const updatedCategory = await Prismaclient.categories.update({
      where: { categoryId: category.categoryId },
      data: {
        categoryName: category.categoryName,
        parentCategoryId: category.parentCategoryId,
        status: category.status,
      },
    });
    return updatedCategory;
  },
  deleteCategory: async (categoryId: number): Promise<void> => {
    await Prismaclient.categories.delete({ where: { categoryId } });
  },
};
