import { createSlice } from '@reduxjs/toolkit';
import { IShop, defaultShop } from '@/models/reducers/IShop.model';

const initialState: IShop = defaultShop;

const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		setShopInfo: (state, action) => {
			state.shopInfo = action.payload;
		},
		updateShopInfo: (state, action) => {
			state.shopInfo = {
				...state.shopInfo,
				...action.payload,
			};
		},
	},
});

export const { setShopInfo, updateShopInfo } = shopSlice.actions;
export default shopSlice.reducer;
