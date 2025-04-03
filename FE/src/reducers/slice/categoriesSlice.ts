import { createSlice } from '@reduxjs/toolkit';
import { ICategoriesState, ICategoryData } from '@/models/reducers/ICategories.model';

const initialState: ICategoriesState = ICategoryData;

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.categories = action.payload;
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

export const { setCategories, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
