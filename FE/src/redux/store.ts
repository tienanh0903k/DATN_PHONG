/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './rootReducer';

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<any>();
