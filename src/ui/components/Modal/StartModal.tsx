import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import StartForm from "../Form/StartForm";
import { ModalProps } from "./ModalProps";


const StartModal: React.FC<ModalProps> = ({ btnName, title, size,parentRef }) => {
	const [show, setShow] = useState(false);

	// const isLoading=true

	const handleClose = () => {
    setShow(false)
    parentRef?.current?.clear()
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
					<StartForm closeModal={handleClose} />
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default StartModal;
