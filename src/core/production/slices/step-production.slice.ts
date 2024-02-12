import { createSlice } from "@reduxjs/toolkit";
import { PartialStepProduction } from "../gateway/step-production.gateway";
import { actionIsAvailableToEnd, actionOperatorId, getLastStepOperator } from "../usecases/get-last-step";
import { createStep } from "../usecases/create-step";
import { endStep } from "../usecases/end-step";
import { AppRootState } from "@/core/store/create-store";

export interface StepProductionState {
	lastStep: PartialStepProduction | null;
	operatorIdSelected: string;
	isavailableToEndStep: boolean;
}

export const stepProductionSlice = createSlice({
	name: "step",
	initialState: {
		lastStep: null,
		operatorIdSelected: "",
		isavailableToEndStep: false,
	} as StepProductionState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getLastStepOperator.fulfilled, (state, action) => {
				state.lastStep = action.payload;
			})
			.addCase(actionIsAvailableToEnd, (state, action) => {
				state.isavailableToEndStep = action.payload;
			})
			.addCase(actionOperatorId, (state, action) => {
				state.operatorIdSelected = action.payload;
			})
			.addCase(createStep.fulfilled, (state) => {
				state.operatorIdSelected = "";
				state.lastStep = null;
			})
			.addCase(endStep.fulfilled, (state) => {
				state.operatorIdSelected = "";
				state.lastStep = null;
			});
	},
});

export const selectEndStepAvailable = (state: AppRootState) => state.step.isavailableToEndStep;
export const selectIsOperator = (state: AppRootState) => state.step.operatorIdSelected.length > 0;
export const selectLastStepId = (state: AppRootState) => state.step.lastStep?.stepId;
