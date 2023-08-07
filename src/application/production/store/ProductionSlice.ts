import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Operator } from "../domain/Operator";
import { Problem } from "../domain/Problem";
import { serverApi } from "./ApiServer";
import { Model } from "../domain/Model";
import { ActionProduction } from "../domain/Actions";

export interface ProductionState {
	operatorList: Operator[];
	modelList: Model[];
	actionList: string[];
	problem: Problem[] | undefined;
	showAfterSelectOperator: boolean;
	action: ActionProduction;
	operator: Operator;
}

const initialState: ProductionState = {
	operatorList: [],
	actionList: [],
	modelList: [],
	problem: [],
	showAfterSelectOperator: false,
	action: {
		actionId: undefined,
		action: "",
		model: "",
		bonne: 0,
		rebut: 0,
	},
	operator: {
		operatorId: 0,
		name: "",
		barcode: "",
	},
};

export const productionSlice = createSlice({
	name: "production",
	initialState,
	reducers: {
		showAfterOperatorSelected: (state, action: PayloadAction<boolean>) => {
			state.showAfterSelectOperator = action.payload;
		},
		operatorsListed: (state, action: PayloadAction<Operator[]>) => {
			state.operatorList = action.payload;
		},
		modelsListed: (state, action: PayloadAction<Model[]>) => {
			state.modelList = action.payload;
		},
		actionsListed: (state, action: PayloadAction<string[]>) => {
			state.actionList = action.payload;
		},
		problemListed: (state, action: PayloadAction<Problem[]>) => {
			state.problem = action.payload;
		},
		quantityActionSet: (state, action: PayloadAction<{ bonne: number; rebut: number }>) => {
			state.action.bonne = action.payload.bonne;
			state.action.rebut = action.payload.rebut;
		},
		infoActionSet: (state, action: PayloadAction<{ action: string; model: string }>) => {
			state.action.model = action.payload.model;
			state.action.action = action.payload.action;
		},
		infoOperatorSet: (state, action: PayloadAction<Operator>) => {
			state.operator.operatorId = action.payload.operatorId;
			state.operator.name = action.payload.name;
			state.operator.barcode = action.payload.barcode;
		},
		reset: (state) => {
			state.operator.operatorId = 0;
			state.operator.name = "";
			state.operator.barcode = "";
			state.showAfterSelectOperator = false;
			state.action.actionId = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(serverApi.endpoints.getAllOperators.matchFulfilled, (state, action) => {
				state.operatorList = action.payload;
			})
			.addMatcher(serverApi.endpoints.getAllModels.matchFulfilled, (state, action) => {
				state.modelList = action.payload;
			})
			.addMatcher(serverApi.endpoints.getAction.matchFulfilled, (state, action) => {
				state.action.actionId = action.payload.actionId;
			})
			.addMatcher(serverApi.endpoints.getAllActions.matchFulfilled, (state, action) => {
				state.actionList = action.payload;
			})
	},
});

export const {
	actionsListed,
	modelsListed,
	operatorsListed,
	problemListed,
	showAfterOperatorSelected,
	infoActionSet,
	quantityActionSet,
	infoOperatorSet,
	reset,
} = productionSlice.actions;

export default productionSlice.reducer;
