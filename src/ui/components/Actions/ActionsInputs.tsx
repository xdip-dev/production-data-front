import { Col, Form, InputGroup, Row } from "react-bootstrap";
import SelectBox from "../Select/SelectBox";

const ActionInputs: React.FC = () => {
  const x = [{ name: "A" }, { name: "B" }, { name: "C" }];
  return (
    <div>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Operator
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </Col>
        <Col>
          <SelectBox listeElement={x} />
        </Col>
        <Col>
          <SelectBox listeElement={x} />
        </Col>
      </Row>
    </div>
  );
};

export default ActionInputs;
