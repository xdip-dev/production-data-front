import { createAppAsyncThunk } from "@/core/store/create-app-thunk";

export const getAllActions = createAppAsyncThunk("actions/getAllActions", async (_, { extra: { actionsGateway } }) => {
	const response = await actionsGateway.getAllActions();
	return response;
});
