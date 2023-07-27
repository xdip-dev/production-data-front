import { Button, Col, Row } from "react-bootstrap";
import SelectBox from "../Select/SelectBox";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { showAfterOperatorSelected } from "../../../application/production/store/ProductionSlice";
import TableProd from "./ActionsDetails";
import StartModal from "../Modal/StartModal";
import EndModal from "../Modal/EndModal";

const ActionInputs: React.FC = () => {
  const dispatch = useAppDispatch();

  const operators = useAppSelector((state) => state.production.operatorList);
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
        <Col md={4}>
          <SelectBox
            listeElement={operators}
            onSelected={handleSelection}
            placeholder="Select Operator"
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
              <EndModal btnName={"Stop"} title={"Stop Operatie"} />
            </Col>
            <Col>
              <StartModal btnName={"Incep"} title={"Incep Operatie"}/>
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
