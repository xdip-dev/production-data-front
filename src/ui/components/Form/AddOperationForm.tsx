import { useState } from "react";
import { Button, Form } from "react-bootstrap";
interface Props {
	closeModal(): void;
}
const AddOpperationForm: React.FC<Props> = ({ closeModal }) => {

    const [radioZone, setRadioZone] = useState<string>();

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
        console.log(radioZone);
		closeModal();
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				{["INJ", "CAN", "ASM"].map((type) => {
					return (
						<Form.Check
							inline
                            key={type}
							label={type}
							name='radioGroup'
							type="radio"
							id={type}
                            onChange={(e)=>setRadioZone(e.target.id)}
						/>
					);
				})}
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default AddOpperationForm;
