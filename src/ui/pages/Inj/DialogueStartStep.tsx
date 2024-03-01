import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThunkCreationsProps } from "@/core/production/usecases/create-step";
import { selectModelList } from "@/core/erp/slices/erp.slice";
import { selectActionsList } from "@/core/actions/slices/actions.slice";
import { selectMatriceList } from "@/core/machine/slice/machine.slice";

interface Props {
	handleSubmitCreation(props: ThunkCreationsProps): Promise<boolean>;
}

export default function DialogueStartStep(props: Props) {
	const zone = "INJ";
	// const isOperator = useSelector();
	const listeOfActions = useSelector(selectActionsList);
	const listModel = useSelector(selectModelList);
	const listMatrice = useSelector(selectMatriceList);
	const [visible, setVisible] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>();
	const [model, setModel] = useState<string>("");
	const [action, setAction] = useState<string>("");
	const [matrice, setMatrice] = useState<string>("");
	const [disableSubmit, setDisableSubmmit] = useState<boolean>(true);

	useEffect(() => {
		if (action && model) {
			setDisableSubmmit(false);
		}
	}, [action, model]);

	const handleSubmit = async () => {
		setLoading(true);
		console.log(matrice);
		const res = await props.handleSubmitCreation({
			action,
			model,
			matrice,
		});
		if (res) {
			setVisible(false);
		}
		setLoading(false);
	};

	return (
		<>
			<Button
				// disabled={!isOperator}
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
						<label htmlFor="matrice" className="col-3 font-bold">
							Matrice
						</label>
						<div className="col">
							<Dropdown
								id="matrice"
								options={listMatrice}
								optionLabel="designation"
								optionValue="code_id"
								placeholder={matrice ? "" : "Select Matrice"}
								value={matrice}
								filter
								filterBy="code_id,designation"
								onChange={(e) => {
									setMatrice(e.target.value);
								}}
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
								options={listeOfActions.filter((e) => e.zone === zone)}
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
