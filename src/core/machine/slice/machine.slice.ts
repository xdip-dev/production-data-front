import { createSlice } from "@reduxjs/toolkit";
import { Matrice, OperatorMachine } from "../gateway/machine.gateway";
import { getAllMatrice, getAllOperatorMachine } from "../services/machine.service";
import { AppRootState } from "@/core/store/create-store";

export interface MachineSliceState {
	listOperator: OperatorMachine[];
	listMatrice: Matrice[];
}

export const machineSlice = createSlice({
	name: "machine",
	initialState: {
		listMatrice: [],
		listOperator: [],
	} as MachineSliceState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllOperatorMachine.fulfilled, (state, action) => {
				state.listOperator = action.payload;
			})
			.addCase(getAllMatrice.fulfilled, (state, action) => {
				state.listMatrice = action.payload;
			});
	},
});

export const selectMatriceList = (state: AppRootState) => state.machine.listMatrice;
