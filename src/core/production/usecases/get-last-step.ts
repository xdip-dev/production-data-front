import { createAppAsyncThunk } from "@/core/store/create-app-thunk";
import { createAction } from "@reduxjs/toolkit";

export const actionOperatorId = createAction<string>("operatorIdSelection");
export const actionIsAvailableToEnd = createAction<boolean>("isAvailableToEnd");

export const getLastStepOperator = createAppAsyncThunk(
	"production/getLastStepOperator",
	async (operatorId: string, { extra: { stepProductionGateway }, dispatch }) => {
		const response = await stepProductionGateway.getLastStepOperator(operatorId);
		dispatch(actionOperatorId(operatorId));
		dispatch(actionIsAvailableToEnd(response?.status === "in_progress" ? true : false));
		return response;
	}
);
