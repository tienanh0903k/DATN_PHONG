/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { ICart, defaultvalue } from '@/models/reducers/ICart.model';

const initialState: ICart = defaultvalue;

const Cartslice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addtoCart: (state, action) => {
			state.cart = action.payload;
		},
		updateCart: (state, action) => {
			state.cart = {
				...state.cart,
				...action.payload,
			};
		},
		deleteCart: (state, action) => {
			state.cart = state.cart.filter((cart: any) => cart.cartId != action.payload);
		},
	},
});
export const { addtoCart, updateCart, deleteCart } = Cartslice.actions;
export default Cartslice.reducer;
