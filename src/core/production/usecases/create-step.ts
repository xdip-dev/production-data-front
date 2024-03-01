import { ErrorManagement } from "@/core/ErrorType";
import { createAppAsyncThunk } from "@/core/store/create-app-thunk";
import { CreateStepDto } from "../gateway/step-production.gateway";

export type ThunkCreationsProps = Omit<CreateStepDto, "operatorId">;

export const createStep = createAppAsyncThunk(
	"production/createStep",
	async (props: ThunkCreationsProps, { extra: { stepProductionGateway }, getState, rejectWithValue }) => {
		const operator = getState().step.operatorIdSelected;
		if (!operator) {
			return rejectWithValue({ message: "Operator not selected" });
		}
		try {
			const response = await stepProductionGateway.createStep({
				action: props.action,
				model: props.model,
				reference: props.reference,
				previousStepsIds: props.previousStepsIds,
				matrice: props.matrice,
				operatorId: operator,
			});
			return response;
		} catch (err) {
			return rejectWithValue(ErrorManagement(err));
		}
	}
);
