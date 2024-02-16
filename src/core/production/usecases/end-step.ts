import { ErrorManagement } from "@/core/ErrorType";
import { createAppAsyncThunk } from "@/core/store/create-app-thunk";

export interface ThunkEndProps {
	stepId: number;
	bonne?: number;
	rebut?: number;
	problem?: string;
}

export const endStep = createAppAsyncThunk(
	"production/endStep",
	async (props: ThunkEndProps, { extra: { stepProductionGateway }, rejectWithValue }) => {
		if (!props.stepId || props.stepId === 0) {
			rejectWithValue({ message: "No step Id selected" });
		}
		try {
			const response = await stepProductionGateway.endStep(props);
			return response;
		} catch (err) {
			return rejectWithValue(ErrorManagement(err));
		}
	}
);
