import { createAppAsyncThunk } from "@/core/store/create-app-thunk";

export const getPreviousStepInfo = createAppAsyncThunk(
	"production/getPreviousStepInfo",
	async (stepId: number, { extra: { stepProductionGateway } }) => {
		const response = await stepProductionGateway.getStepIdInformation(stepId);
		return response;
	}
);
