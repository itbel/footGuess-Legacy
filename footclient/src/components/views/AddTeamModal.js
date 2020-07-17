import { Modal, Row, Button, Form } from "react-bootstrap";
import React, { useRef, useState, useContext } from "react";
import AddTeam from "../functional/AddTeam";
import { Context } from "../Store";

const AddTeamModal = (props) => {
  const teamNameRef = useRef(null);
  const [state, dispatch] = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    AddTeam(state.selectedTourId, teamName, dispatch).then((response) => {
      if (response !== undefined && response.status === 201) {
        props.notify("Successfully Added Team.");
      } else {
        props.notify("Something went wrong.");
      }
    });
    setTeamName("");
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Add Team
      </Button>
      <Modal
        centered
        show={show}
        onEntered={() => {
          teamNameRef.current.focus();
        }}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h1 className="text-center w-100">Add Team</h1>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Row className="justify-content-center pt-3">
                <h3>Team Name</h3>
              </Row>
              <Row className="justify-content-center pt-3">
                <Row className="w-50">
                  <Form.Control
                    ref={teamNameRef}
                    value={teamName}
                    name="teamName"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    onChange={(e) => {
                      setTeamName(e.target.value);
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
              let rege = new RegExp(/^[A-Za-z\s\-]+$/);
              if (teamName !== undefined && teamName !== "") {
                if (rege.test(teamName)) {
                  handleSubmit(e);
                } else {
                  props.notify(
                    "Team name must contain letters dashes or spaces"
                  );
                }
              } else {
                props.notify("Field cannot be empty");
              }
            }}
            variant="dark"
          >
            Add Another
          </Button>
          <Button
            onClick={(e) => {
              let rege = new RegExp(/^[A-Za-z\s\-]+$/);
              if (teamName !== undefined && teamName !== "") {
                if (rege.test(teamName)) {
                  handleSubmit(e);
                  handleClose();
                } else {
                  props.notify(
                    "Team name must contain letters dashes or spaces"
                  );
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

export default AddTeamModal;
