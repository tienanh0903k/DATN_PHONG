/* eslint-disable @typescript-eslint/no-explicit-any */
import appSlice from '../reducers/app/appSlice';
import authSlice from '../reducers/slice/authSlice';
import shopSlice from '../reducers/slice/shopSlice';

const rootReducer: any = {
	app: appSlice,
	auth: authSlice,
	shop: shopSlice,
};

export { rootReducer };
