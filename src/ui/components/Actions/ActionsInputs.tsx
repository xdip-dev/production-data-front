import { Button, Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { infoOperatorSet, showAfterOperatorSelected } from "../../../application/production/store/ProductionSlice";
import TableProd from "./ActionsDetails";
import StartModal from "../Modal/StartModal";
import EndModal from "../Modal/EndModal";
import { Typeahead  } from "react-bootstrap-typeahead";
import { Operator } from "../../../application/production/domain/Operator";
import { serverApi } from "../../../application/production/store/ApiServer";

const ActionInputs: React.FC = () => {
  const dispatch = useAppDispatch();

  const [cancelAction]=serverApi.useCancelActionMutation()

  const operators = useAppSelector((state) => state.production.operatorList);
  const actionId = useAppSelector((state) => state.production.action.actionId);
  const showActionDetails = useAppSelector(
    (state) => state.production.showAfterSelectOperator
  );

  const handleSelection = (event: Operator[]) => {
    const data = event[0];
    if (!data) {
      return
    }
    dispatch(infoOperatorSet(data));
    dispatch(showAfterOperatorSelected(true));
    
  };

  const handleCancelCLick = () => {
    if (actionId) {
      cancelAction({actionId})
      .catch(()=>alert('Actiunea nu a putut fi anulata'))
    }
  }

  return (
    <div>
      <Row>
        <Col md={4}>
        <Typeahead
          id="operatorList"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          labelKey={(option:Operator)=> `[${option.barcode}]${option.name}`}
          options={operators}
          onChange={(e) => handleSelection(e as typeof operators)}
          placeholder="Choose a state..."
          clearButton
        />
        </Col>
      </Row>
      {showActionDetails && (
        <div>
          <Row className="text-center text-md-right">
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
            <Button onClick={handleCancelCLick}>Cancel</Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ActionInputs;
