import { createAppAsyncThunk } from "@/core/store/create-app-thunk";

export const getAllOperator = createAppAsyncThunk("erp/getAllOperator", async (_, { extra: { erpGateway } }) => {
	const response = await erpGateway.getAllOperator();
	return response;
});
