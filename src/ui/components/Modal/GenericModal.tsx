import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  btnName:string;
  title:string;
  children: React.ReactNode;
  size?:'sm' |'lg' | 'xl'
}

const ActionModal: React.FC<Props> = ({btnName,children,title,size}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {btnName}
      </Button>

      <Modal show={show} onHide={handleClose} size={size? size:'lg'}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ActionModal;
