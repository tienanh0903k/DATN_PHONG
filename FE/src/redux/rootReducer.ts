/* eslint-disable @typescript-eslint/no-explicit-any */
import appSlice from '../reducers/app/appSlice';
import authSlice from '../reducers/slice/authSlice';
import shopSlice from '../reducers/slice/shopSlice';
import categoriesSlice from '../reducers/slice/categoriesSlice';

const rootReducer: any = {
	app: appSlice,
	auth: authSlice,
	shop: shopSlice,
	categories: categoriesSlice,
};

export { rootReducer };
