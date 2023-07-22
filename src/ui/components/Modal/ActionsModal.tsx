import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ActionInputs from "../Actions/ActionsInputs";

// interface Props {
//   show: boolean;
// }

const ActionModal: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Productions
        </Button>
  
        <Modal show={show} onHide={handleClose} fullscreen={true}>
          <Modal.Header closeButton>
            <Modal.Title>Incep / Terminat / Anulat Actiune</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ActionInputs />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default ActionModal;
