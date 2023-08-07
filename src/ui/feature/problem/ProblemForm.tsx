import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const ProblemForm:React.FC = () => {
  return (
    <Form.Group>
        <Form.Label>Problem</Form.Label>
        <Typeahead
          id="select-problem"
          labelKey="name"
          options={['a', 'b', 'c']}
          placeholder="Choose a problem..."
          clearButton
          />
    </Form.Group>
  )
}

export default ProblemForm;