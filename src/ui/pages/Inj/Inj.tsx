import InputOperator from "@/ui/components/InputOperator";
import TableStepData from "@/ui/components/TableStepData";
import DialogueStartStep from "./DialogueStartStep";
import { ThunkCreationsProps, createStep } from "@/core/production/usecases/create-step";
import { echecToast, showToast, succesToast } from "@/core/store/utils/utils.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/core/store/create-store";
import { getLastStepOperator } from "@/core/production/usecases/get-last-step";
import { OperatorMachine } from "@/core/machine/gateway/machine.gateway";

export default function Inj() {
	const dispatch = useDispatch<AppDispatch>();
	const [remount, setRemount] = useState<number>(0);
	const operators = [{ id: "1", name: "Operator 1", barcode: "123456" }];

	const handleSubmitCreation = async (props: ThunkCreationsProps): Promise<boolean> => {
		const res = await dispatch(createStep(props));
		console.log("res", res);
		if (res.meta.requestStatus === "fulfilled") {
			dispatch(showToast(succesToast("Step Created")));
			setRemount(Math.random());
			return true;
		}
		if (res.meta.requestStatus === "rejected") {
			dispatch(showToast(echecToast(res.payload?.message ?? "Unknown Cause of Error")));
		}
		return false;
	};
	const operatorselection = async (operator?: OperatorMachine) => {
		if (!operator) return;
		dispatch(getLastStepOperator(operator.id));
	};
	return (
		<div key={remount}>
			<div className="flex justify-content-center">
				<InputOperator operators={operators} operatorselection={operatorselection} />
			</div>
			<div className="m-4">
				<TableStepData />
			</div>
			<div className="flex align-items-center justify-content-center justify-content-around">
				<DialogueStartStep handleSubmitCreation={handleSubmitCreation} />
			</div>
		</div>
	);
}
