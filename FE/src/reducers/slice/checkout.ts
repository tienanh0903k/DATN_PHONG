import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
	name: 'checkout',
	initialState: {
		selectedItems: [],
	},
	reducers: {
		SelectedItems: (state, action) => {
			state.selectedItems = action.payload;
		},
		clearSelectedItems: (state) => {
			state.selectedItems = [];
		},
	},
});

export const { SelectedItems, clearSelectedItems } = checkoutSlice.actions;
export default checkoutSlice.reducer;
