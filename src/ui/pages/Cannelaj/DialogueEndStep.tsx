import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { ThunkEndProps } from "@/core/production/usecases/end-step";
import { useSelector } from "react-redux";
import { selectEndStepAvailable, selectLastStepId } from "@/core/production/slices/step-production.slice";

interface Props {
	handleSubmitEndStep(props: ThunkEndProps): Promise<boolean>;
}

export default function DialogueEndStep(props: Props) {
	const isEndAvailable = useSelector(selectEndStepAvailable);
	const lastStepId = useSelector(selectLastStepId);
	const [visible, setVisible] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>();
	const [bonne, setBonne] = useState<number>();
	const [rebut, setRebut] = useState<number>();
	const [problem, setProblem] = useState<string>();
	const [disableSubmit, setDisableSubmmit] = useState<boolean>(true);

	useEffect(() => {
		if (lastStepId && lastStepId > 0) {
			setDisableSubmmit(false);
		}
	}, [lastStepId]);

	const handleSubmit = async () => {
		setLoading(true);
		const res = await props.handleSubmitEndStep({
			stepId: lastStepId ?? 0,
			bonne,
			rebut,
			problem,
		});
		if (res) {
			setVisible(false);
		}
		setLoading(false);
	};

	return (
		<>
			<Button
				disabled={!isEndAvailable}
				label="End Step"
				className="p-button-danger"
				onClick={() => setVisible(true)}
			/>
			<Dialog
				header="End Step"
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
							<InputNumber disabled={true} id="ID" useGrouping={false} value={lastStepId} />
						</div>
					</div>
					<div className="field grid">
						<label htmlFor="bonne" className="col-3  font-bold">
							Bonne
						</label>
						<div className="col">
							<InputNumber
								id="bonne"
								useGrouping={false}
								value={bonne}
								onChange={(e) => setBonne(e.value ?? undefined)}
							/>
						</div>
					</div>
					<div className="field grid">
						<label htmlFor="rebut" className="col-3  font-bold">
							Rebut
						</label>
						<div className="col">
							<InputNumber
								id="rebut"
								useGrouping={false}
								value={rebut}
								onChange={(e) => setRebut(e.value ?? undefined)}
							/>
						</div>
					</div>
					<div className="field grid">
						<label htmlFor="problem" className="col-3  font-bold">
							Problem ?
						</label>
						<div className="col">
							<InputText id="problem" value={problem} onChange={(e) => setProblem(e.target.value)} />
						</div>
					</div>
					<Button
						label="End Step"
						className="p-button-danger"
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
