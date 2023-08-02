import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ModalProps } from "./ModalProps";
import AddOpperationForm from "../Form/AddOperationForm";


const AddOperationModal: React.FC<ModalProps> = ({ btnName, title, size }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        {btnName}
      </Button>

      <Modal show={show} onHide={handleClose} size={size ? size : "lg"}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddOpperationForm closeModal={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddOperationModal;
