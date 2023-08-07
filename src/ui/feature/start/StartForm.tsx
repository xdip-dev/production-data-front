import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Model } from "../../../application/production/domain/Model";
import { serverApi } from "../../../application/production/store/ApiServer";
import ErrorComponent from "../../components/Error/Error";
import { reset } from "../../../application/production/store/ProductionSlice";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";

interface Props {
	closeModal(): void;
}

const StartForm: React.FC<Props> = ({ closeModal }) => {
	const btnName = "Start";
	const dispatch = useAppDispatch();

	const actions = useAppSelector((state) => state.production.actionList);
	const models = useAppSelector((state) => state.production.modelList);
	const operatorId = useAppSelector((state) => state.production.operator.operatorId);
	const [createAction, { isLoading, error }] = serverApi.useCreateActionMutation();

	const [model, setModel] = useState<Model>();
	const [action, setAction] = useState("");
	const [previousAction, setPreviousAction] = useState<number>();

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!model || !action) {
			return;
		}
		console.log(model.name, action);
		createAction({ operatorId: operatorId, model: model.name, action: action, previousAction: previousAction })
			.unwrap()
			.then((res) => {
				console.log(res);
				setModel({ name: "" });
				setAction("");
				dispatch(reset());
				closeModal();
			})
			.catch((err) => console.log(err));
	};

	const handlePreviousAction = (event :React.ChangeEvent<HTMLInputElement>) => {
		setPreviousAction(Number(event.target.value))
		console.log(previousAction);
	}

	if (isLoading) {
		return <SpinnerComponent />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>intrare Model</Form.Label>
				<Typeahead
					clearButton
					id="select-model"
					labelKey="name"
					options={models}
					onChange={(option) => {
						if (option[0]) {
							return setModel(option[0] as Model);
						}
					}}
					placeholder="Select ..."
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>intrare Actiune</Form.Label>
				<Typeahead
					clearButton
					id="select-action"
					labelKey="name"
					options={actions}
					onChange={(option) => {
						if (option[0]) {
							return setAction(option[0] as string);
						}
					}}
					placeholder="Select ..."
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>previous Actiune</Form.Label>
				<Form.Control type="text" placeholder="optional : previous Actiune" onChange={handlePreviousAction} />
			</Form.Group>
			<br />
			<Button variant="primary" type="submit">
				{btnName}
			</Button>
		</Form>
	);
};

export default StartForm;
