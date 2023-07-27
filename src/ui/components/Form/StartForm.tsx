import { Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../../store/store";
import SelectBox from "../Select/SelectBox";
import { useState } from "react";

interface Props {
  closeModal(): void;
}

const StartForm: React.FC<Props> = ({ closeModal }) => {
  const btnName = "Start";

  const actions = useAppSelector((state) => state.production.actionList);
  const models = useAppSelector((state) => state.production.modelList);

  const [model, setModel] = useState("");
  const [action, setAction] = useState("");

  const handleChangeModel = (event: string) => {
    setModel(event);
  };
  const handleChangeAction = (event: string) => {
    setAction(event);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(model, action);
    setModel("");
    setAction("");
    closeModal();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>intrare Model</Form.Label>
        <SelectBox
          listeElement={models}
          placeholder="Select Model"
          onSelected={handleChangeModel}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>intrare Actiune</Form.Label>
        <SelectBox
          listeElement={actions.map((value) => {
            return { name: value };
          })}
          placeholder="Select Action"
          onSelected={handleChangeAction}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {btnName}
      </Button>
    </Form>
  );
};

export default StartForm;
