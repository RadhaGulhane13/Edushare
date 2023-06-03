import react from "react";
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form_c from '../Form/Form';

const ModalComponent = () => {
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Post </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Contribute by adding projects, information, files !!!</p>

          <Form_c show={show} setShow={setShow} />
        </Modal.Body>
      </Modal>
    </>


  );
}

export default ModalComponent;