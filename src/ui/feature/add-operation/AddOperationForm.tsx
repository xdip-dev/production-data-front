import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";
import ErrorComponent from "../../components/Error/Error";
import { serverApi } from "../../../application/production/store/ApiServer";
interface Props {
	closeModal(): void;
}
const AddOpperationForm: React.FC<Props> = ({ closeModal }) => {
	const [radioZone, setRadioZone] = useState<string>();
	const [actionInput, setActionInput] = useState<string>();
	const [validated, setValidated] = useState(false);
	const [addAction, { isLoading, error }] = serverApi.useAddAllActionsMutation();

	const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false || !radioZone || !actionInput) {
			console.log("nop");
			event.stopPropagation();
			setValidated(true);
			return;
		}
		console.log(radioZone, actionInput);
		addAction({ zone: radioZone, action: actionInput });
		closeModal();
	};

	const handleActionInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setActionInput(event.target.value);
		console.log(actionInput);
	};

	if (isLoading) {
		return <SpinnerComponent />;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}
	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Form.Group controlId="validationCustom02">
				<Form.Label>Choose Zone</Form.Label>
				<br />
				{["INJ", "CAN", "ASM"].map((type) => {
					return (
						<Form.Check
							inline
							key={type}
							label={type}
							name="radioGroup"
							type="radio"
							id={type}
							onChange={(e) => setRadioZone(e.target.id)}
							required
						/>
					);
				})}
			</Form.Group>
			<Form.Group controlId="validationCustom03">
				<Form.Label>Action</Form.Label>
				<Form.Control type="text" placeholder="Action" required onChange={handleActionInput} />
				<Form.Control.Feedback type="invalid">Please provide an Action.</Form.Control.Feedback>
			</Form.Group>
			<br />
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default AddOpperationForm;
