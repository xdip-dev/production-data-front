import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppRootState } from "../create-store";
import { ToastMessage } from "primereact/toast";

export interface UtilsSliceState {
	toast: ToastMessage | null;
}

export const utilsSlice = createSlice({
	name: "utils",
	initialState: {
		toast: null,
	} as UtilsSliceState,
	reducers: {
		showToast: (state, action: PayloadAction<ToastMessage>) => {
			state.toast = action.payload;
		},
		hideToast: (state) => {
			state.toast = null;
		},
	},
});
export const { showToast, hideToast } = utilsSlice.actions;
export const selectToast = (state: AppRootState) => state.utils.toast;

export const succesToast = (msg: string): ToastMessage => {
	return {
		severity: "success",
		summary: "Success",
		detail: msg,
		life: 2000,
	};
};
export const echecToast = (msg: string): ToastMessage => {
	return {
		severity: "error",
		summary: "Error",
		detail: msg,
		life: 2000,
	};
};
