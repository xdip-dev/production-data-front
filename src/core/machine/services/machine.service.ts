import { createAppAsyncThunk } from "@/core/store/create-app-thunk";

export const getAllOperatorMachine = createAppAsyncThunk(
	"machine/getOperator",
	async (_, { extra: { machineGateway } }) => {
		const response = await machineGateway.getAllOperatorMachine();
		return response;
	}
);

export const getAllMatrice = createAppAsyncThunk("machine/getMatrice", async (_, { extra: { machineGateway } }) => {
	const response = await machineGateway.getAllMatrice();
	return response;
});
