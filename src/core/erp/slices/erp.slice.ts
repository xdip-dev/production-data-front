import { createSlice } from "@reduxjs/toolkit";
import { getAllOperator } from "../usecases/get-all-operator.usecase";
import { Model, Operator } from "../gateway/erp.gateway";
import { getAllModel } from "../usecases/get-all-model.usecase";

export type ErpState = {
	listOperator: Operator[];
	listModel: Model[];
	operatorListLoading: boolean;
};

export const erpSlice = createSlice({
	name: "erp",
	initialState: {} as ErpState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllOperator.pending, (state) => {
			state.operatorListLoading = true;
		});
		builder.addCase(getAllOperator.fulfilled, (state, action) => {
			state.listOperator = action.payload;
			state.operatorListLoading = false;
		});
		builder.addCase(getAllModel.fulfilled, (state, action) => {
			state.listModel = action.payload;
		});
	},
});

export const selectOperatorList = (state: { erp: ErpState }) => state.erp.listOperator;
export const selectModelList = (state: { erp: ErpState }) => state.erp.listModel;
