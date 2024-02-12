import { createAppAsyncThunk } from "@/core/store/create-app-thunk";

export interface ThunkEndProps {
	stepId: number;
	bonne?: number;
	rebut?: number;
	problem?: string;
}

export const endStep = createAppAsyncThunk(
	"production/endStep",
	async (props: ThunkEndProps, { extra: { stepProductionGateway } }) => {
		if (!props.stepId || props.stepId === 0) {
			throw new Error("Step not selected");
		}
		const response = await stepProductionGateway.endStep(props);
		return response;
	}
);
