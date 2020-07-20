import { Modal, Row, Button, Form } from "react-bootstrap";
import React, { useRef, useState, useContext } from "react";
import CreateTournament from "../functional/CreateTournament";
import { Context } from "../Store";

const CreateTournamentModal = (props) => {
  const tourNameRef = useRef(null);
  const [state, dispatch] = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    CreateTournament(name, state, dispatch).then((response) => {
      if (response !== undefined && response.status === 200) {
        props.notify("Sucessfully Created Tournament");
        setName("");
        handleClose();
      } else {
        props.notify(response.response.data.msg || "Something went wrong");
      }
    });
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Create Tournament
      </Button>
      <Modal
        centered
        onEntered={() => {
          tourNameRef.current.focus();
        }}
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
                    ref={tourNameRef}
                    value={name}
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        let rege = new RegExp(/^[0-9A-Za-z\s-]+$/);
                        if (name !== undefined && name !== "") {
                          if (rege.test(name)) {
                            if (name.length > 4 && name.length <= 30) {
                              if (!/\s{2,}/.test(name)) {
                                handleSubmit(e);
                              } else {
                                props.notify(
                                  "Tournament name must not have 2 consecutive white spaces."
                                );
                              }
                            } else {
                              props.notify(
                                "Tournament name must be at least 5 characters"
                              );
                            }
                          } else {
                            props.notify(
                              "Tournament name must be alphanumerical"
                            );
                          }
                        } else {
                          props.notify("Field cannot be empty");
                        }
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
              let rege = new RegExp(/^[0-9A-Za-z\s-]+$/);
              if (name !== undefined && name !== "") {
                if (rege.test(name)) {
                  if (name.length > 4 && name.length <= 30) {
                    if (!/\s{2,}/.test(name)) {
                      handleSubmit(e);
                    } else {
                      props.notify(
                        "Tournament name must not have 2 consecutive white spaces."
                      );
                    }
                  } else {
                    props.notify(
                      "Tournament name must be at least 5 characters"
                    );
                  }
                } else {
                  props.notify("Tournament name must be alphanumerical");
                }
              } else {
                props.notify("Field cannot be empty");
              }
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
