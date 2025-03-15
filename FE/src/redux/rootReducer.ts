/* eslint-disable @typescript-eslint/no-explicit-any */
import appSlice from "../reducers/app/appSlice";
import authSlice from "../reducers/slice/authSlice";

const rootReducer: any = {
  app: appSlice,
  auth: authSlice,
};

export { rootReducer };
