import { Button, Form } from "react-bootstrap";
import { useState } from "react";
interface Props {
  closeModal(): void;
}

const EndForm: React.FC<Props> = ({ closeModal }) => {
  const [bonne, setBonne] = useState(0);
  const [rebut, setRebut] = useState(0);

  const btnName = "End";

  const handleChangeBonne = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = Number(event.target.value);
    if (inputNumber < 0) {
      return setBonne(0);
    }
    setBonne(inputNumber);
  };

  const handleChangeRebut = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = Number(event.target.value);
    if (inputNumber < 0) {
      return setRebut(0);
    }
    setRebut(inputNumber);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("submit");
    closeModal();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="bonneInput">
        <Form.Label>Intrare Bun:</Form.Label>
        <Form.Control
          type="number"
          min="0"
          defaultValue={bonne}
          onChange={handleChangeBonne}
        />
      </Form.Group>

      <Form.Group controlId="rebutInput">
        <Form.Label>Intrare Rebut:</Form.Label>
        <Form.Control
          type="number"
          min="0"
          defaultValue={rebut}
          onChange={handleChangeRebut}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Problem ?" />
      </Form.Group>

      <Button variant="primary" type="submit">
        {btnName}
      </Button>
    </Form>
  );
};

export default EndForm;
