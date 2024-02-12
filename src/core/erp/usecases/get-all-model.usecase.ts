import { createAppAsyncThunk } from "@/core/store/create-app-thunk";

export const getAllModel = createAppAsyncThunk("erp/getAllModel", async (_, { extra: { erpGateway } }) => {
	const response = await erpGateway.getAllModel();
	return response;
});
