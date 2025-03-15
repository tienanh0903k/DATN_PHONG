import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTHORITIES } from "@/constant/constant";
import { defaultAuth, IAuthe } from "@/models/reducers/IAuthe.model";

const initialState: IAuthe = defaultAuth;

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IAuthe>) => {
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;
      state.userInfo.authenticated = [AUTHORITIES.USER];
    },
    updateUserInfo: (state, action: PayloadAction<IAuthe>) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload.userInfo,
      };
    },
    logout: (state) => {
      state.userInfo = defaultAuth.userInfo;
      state.isAuthenticated = false;
      state.userInfo.authenticated = [];
    },
  },
});
export const { setUserInfo, updateUserInfo, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
