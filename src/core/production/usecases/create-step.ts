import { createAppAsyncThunk } from "@/core/store/create-app-thunk";

export interface ThunkCreationsProps {
	action: string;
	model: string;
	reference?: string;
	previousStepId?: number;
}

export const createStep = createAppAsyncThunk(
	"production/createStep",
	async (props: ThunkCreationsProps, { extra: { stepProductionGateway }, getState }) => {
		const operator = getState().step.operatorIdSelected;
		if (!operator) {
			throw new Error("Operator not selected");
		}
		const response = await stepProductionGateway.createStep({
			action: props.action,
			model: props.model,
			reference: props.reference,
			previousStepId: props.previousStepId,
			operatorId: operator,
		});
		return response;
	}
);
