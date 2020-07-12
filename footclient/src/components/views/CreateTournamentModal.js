import { Modal, Row, Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import CreateTournament from "../functional/CreateTournament";
import { Context } from "../Store";

const CreateTournamentModal = () => {
  const [state, dispatch] = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    CreateTournament(name, state, dispatch).then((response) => {
      console.log(response);
    });
    setName("");
    handleClose();
  };
  useEffect(() => {}, [show]);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Create Tournament
      </Button>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h1 className="text-center w-100">Create Tournament</h1>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Row className="justify-content-center pt-3">
                <h3>Tournament Name</h3>
              </Row>
              <Row className="justify-content-center pt-3">
                <Row className="w-50">
                  <Form.Control
                    value={name}
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    type="text"
                    placeholder="Enter name"
                  />
                </Row>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              handleSubmit(e);
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

export default CreateTournamentModal;
