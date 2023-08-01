import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { serverApi } from "../../../application/production/store/ApiServer";
import ErrorComponent from "../Error/Error";
import { reset } from "../../../application/production/store/ProductionSlice";
interface Props {
  closeModal(): void;
}

const EndForm: React.FC<Props> = ({ closeModal }) => {

  const dispatch = useAppDispatch();

  const actionId = useAppSelector((state) => state.production.action.actionId);
  const [endAction, { isLoading, error }] = serverApi.useEndActionMutation();

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
    if(!actionId){return}
    endAction({ actionId: actionId, bonne: bonne, rebut: rebut })
    .unwrap()
    .then((res) => {
      console.log(res);
      setBonne(0);
      setRebut(0);
      dispatch(reset())
      closeModal();
    })
    .catch((err) => console.log(err));
  };

  if (isLoading) {
		return <div>loading...</div>;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

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
