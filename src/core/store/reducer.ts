import { combineReducers } from "@reduxjs/toolkit";
import { erpSlice } from "../erp/slices/erp.slice";
import { stepProductionSlice } from "../production/slices/step-production.slice";
import { actionsSlice } from "../actions/slices/actions.slice";
import { utilsSlice } from "./utils/utils.slice";

export const reducer = combineReducers({
	[erpSlice.name]: erpSlice.reducer,
	[stepProductionSlice.name]: stepProductionSlice.reducer,
	[actionsSlice.name]: actionsSlice.reducer,
	[utilsSlice.name]: utilsSlice.reducer,
});
