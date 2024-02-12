import { createSlice } from "@reduxjs/toolkit";
import { getAllActions } from "../services/actions.services";
import { GetAllActionsResponse } from "../gateways/actions.gateway";

export interface ActionsState {
	listeOfActions: GetAllActionsResponse[];
}

export const actionsSlice = createSlice({
	name: "actions",
	initialState: {} as ActionsState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllActions.fulfilled, (state, action) => {
			state.listeOfActions = action.payload;
		});
	},
});

export const selectActionsList = (state: { actions: ActionsState }) => state.actions.listeOfActions;
