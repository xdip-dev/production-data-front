import { useDispatch, useSelector } from "react-redux";
import InputOperator from "../../components/InputOperator";
import { Operator } from "@/core/erp/gateway/erp.gateway";
import { AppDispatch } from "@/core/store/create-store";
import { getLastStepOperator } from "@/core/production/usecases/get-last-step";
import TableStepData from "../../components/TableStepData";
import DialogueStartStep from "./DialogueStartStep";
import { getPreviousStepInfo } from "@/core/production/usecases/get-info-stepid";
import { ThunkCreationsProps, createStep } from "@/core/production/usecases/create-step";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import DialogueEndStep from "./DialogueEndStep";
import { ThunkEndProps, endStep } from "@/core/production/usecases/end-step";
import { IdStepInfoModel } from "@/core/production/gateway/step-production.gateway";
import { selectOperatorList } from "@/core/erp/slices/erp.slice";
import { echecToast, showToast, succesToast } from "@/core/store/utils/utils.slice";

export default function Cannelaj() {
	const operators = useSelector(selectOperatorList);
	const dispatch = useDispatch<AppDispatch>();
	const toast = useRef<Toast>(null);
	const [remount, setRemount] = useState<number>(0);

	const operatorselection = async (operator?: Operator) => {
		if (!operator) return;
		dispatch(getLastStepOperator(operator.id));
	};

	const idSelection = async (id?: number): Promise<IdStepInfoModel | null> => {
		if (!id) return null;
		const res = await dispatch(getPreviousStepInfo(id)).unwrap();
		return res;
	};

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
	const handleSubmitEndStep = async (props: ThunkEndProps): Promise<boolean> => {
		const res = await dispatch(endStep(props));
		if (res.meta.requestStatus === "fulfilled") {
			dispatch(showToast(succesToast("Step Ended")));
			setRemount(Math.random());
			return true;
		}
		if (res.meta.requestStatus === "rejected") {
			dispatch(showToast(echecToast("Step Ended")));
		}
		return false;
	};

	return (
		<>
			<div key={remount}>
				<Toast ref={toast} />
				<div className="flex justify-content-center">
					<InputOperator operators={operators} operatorselection={operatorselection} />
				</div>
				<div className="m-4">
					<TableStepData />
				</div>
				<div className="flex align-items-center justify-content-center justify-content-around">
					<DialogueStartStep getStepInfoFromId={idSelection} handleSubmitCreation={handleSubmitCreation} />
					<DialogueEndStep handleSubmitEndStep={handleSubmitEndStep} />
				</div>
			</div>
		</>
	);
}
