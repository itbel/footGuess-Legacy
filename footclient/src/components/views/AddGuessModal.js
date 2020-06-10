import { Modal, Button } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../App";
import FetchMatches from "../functional/FetchMatches";

const AddGuessModal = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);

  // Modal Functionality
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    FetchMatches(authState, dispatch).then((response) => {
      setMatches(response);
    });
  }, [show]);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add Guess
      </Button>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h1 className="text-center w-100">Add Guess</h1>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              handleSubmit(e);
              handleClose();
            }}
            variant="dark"
          >
            Create
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddGuessModal;
