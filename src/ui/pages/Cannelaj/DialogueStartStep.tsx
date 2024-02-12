import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { useSelector } from "react-redux";
import { IdStepInfoModel } from "@/core/production/gateway/step-production.gateway";
import { ThunkCreationsProps } from "@/core/production/usecases/create-step";
import { selectIsOperator } from "@/core/production/slices/step-production.slice";
import { selectModelList } from "@/core/erp/slices/erp.slice";
import { selectActionsList } from "@/core/actions/slices/actions.slice";

interface Props {
	getStepInfoFromId(stepId: number): Promise<IdStepInfoModel | null>;
	handleSubmitCreation(props: ThunkCreationsProps): Promise<boolean>;
}

export default function DialogueStartStep(props: Props) {
	const isOperator = useSelector(selectIsOperator);
	const listeOfActions = useSelector(selectActionsList);
	const listModel = useSelector(selectModelList);
	const [visible, setVisible] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>();
	const [model, setModel] = useState<string>("");
	const [action, setAction] = useState<string>("");
	const [disableSubmit, setDisableSubmmit] = useState<boolean>(true);

	useEffect(() => {
		if (action && model) {
			setDisableSubmmit(false);
		}
	}, [action, model]);

	const handleSubmit = async () => {
		setLoading(true);
		const res = await props.handleSubmitCreation({
			action,
			model,
		});
		if (res) {
			setVisible(false);
		}
		setLoading(false);
	};

	const getStepInfoFromId = async (stepId: number) => {
		const data = await props.getStepInfoFromId(stepId);
		console.log("Data from stepId", data);
		if (!data) return;
		setModel(data.model);
	};

	//TODO: checkbox make multi Id selection available
	//TODO: type model to set

	return (
		<>
			<Button
				disabled={!isOperator}
				label="Start Step"
				className="p-button-success"
				onClick={() => setVisible(true)}
			/>
			<Dialog
				header="Start Step"
				visible={visible}
				modal={true}
				onHide={() => setVisible(false)}
				className="p-fluid"
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className="field grid">
						<label htmlFor="ID" className="col-3 font-bold">
							ID
						</label>
						<div className="col">
							<InputNumber
								id="ID"
								useGrouping={false}
								onChange={(e) => getStepInfoFromId(e.value ?? 0)}
							/>
						</div>
					</div>
					<div className="field grid">
						<label htmlFor="model" className="col-3  font-bold">
							Model
						</label>
						<div className="col">
							<Dropdown
								id="model"
								options={listModel}
								optionLabel="name"
								optionValue="name"
								placeholder={model ? "" : "Select Model"}
								filter
								filterBy="name,id"
								value={model}
								onChange={(e) => {
									setModel(e.target.value);
								}}
							/>
						</div>
					</div>

					<div className="field grid">
						<label htmlFor="action" className="col-3  font-bold">
							action
						</label>
						<div className="col">
							<Dropdown
								id="action"
								value={action}
								options={listeOfActions}
								optionLabel="name"
								optionValue="id"
								filter
								onChange={(e) => setAction(e.target.value)}
							/>
						</div>
					</div>
					<Button
						label="Start Step"
						className="p-button-success"
						onClick={handleSubmit}
						disabled={disableSubmit}
						loading={loading}
						icon="pi pi-play"
					/>
				</form>
			</Dialog>
		</>
	);
}
