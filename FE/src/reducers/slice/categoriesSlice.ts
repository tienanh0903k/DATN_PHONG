import { createSlice } from '@reduxjs/toolkit';
import { ICategoriesState, ICategoryData } from '@/models/reducers/ICategories.model';

const initialState: ICategoriesState = ICategoryData;

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		createCategory: (state, action) => {
			state.categories.push(action.payload);
		},
		updateCategory: (state, action) => {
			state.categories = {
				...state.categories,
				...action.payload,
			};
		},
		deleteCategory: (state, action) => {
			state.categories = state.categories.filter((category) => category.categoryId !== action.payload);
		},
	},
});

export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
