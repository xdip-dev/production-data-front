import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  btnName: string;
  title: string;
  size?: "sm" | "lg" | "xl";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentRef?: React.MutableRefObject<any>;
  contentComponent: React.ComponentType<{ closeModal: () => void }>; //TODO doesn't work...
}

const GenericModal: React.FC<Props> = ({ btnName, title, size, parentRef, contentComponent: ContentComponent }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    parentRef?.current?.clear();
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
          <ContentComponent closeModal={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GenericModal;