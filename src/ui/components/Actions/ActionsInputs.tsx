import { Button, Col, Row } from "react-bootstrap";
import SelectBox from "../Select/SelectBox";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { showAfterOperatorSelected } from "../../../application/production/store/ProductionSlice";
import TableProd from "./ActionsDetails";
import ActionsForm from "./ActionsForm";

const ActionInputs: React.FC = () => {
  const dispatch = useAppDispatch();

  const actions = useAppSelector((state) => state.production.action);
  const models = useAppSelector((state) => state.production.model);
  const operators = useAppSelector((state) => state.production.operator);
  const showActionDetails = useAppSelector(
    (state) => state.production.showAfterSelectOperator
  );

  const handleSelection = (event: string) => {
    console.log(event);
    dispatch(showAfterOperatorSelected(true));
  };

  return (
    <div>
      <Row>
        <Col>
          <SelectBox listeElement={operators} onSelected={handleSelection} />
        </Col>
        <Col>
          <SelectBox listeElement={models} />
        </Col>
        <Col>
          <SelectBox
            listeElement={actions.map((value) => {
              return { name: value };
            })}
          />
        </Col>
      </Row>
      {showActionDetails && (
        <div>
          <Row>
              <TableProd />
          </Row>
          <Row className="text-center text-md-right">
            <Col>
              <ActionsForm />
            </Col>
            <Col>
              <Button>Start</Button>
            </Col>
            <Col>
              <Button>Cancel</Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ActionInputs;
