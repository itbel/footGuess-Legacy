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
    let errorMsg = "";
    let teamisCharactersOrDash = /^[A-Za-z\s-]+$/.test(teamName);
    let teamisRequiredLength = teamName.length > 0 && teamName.length <= 30;
    let lessThanTwoWhitespace = !/\s{2,}/.test(teamName);
    let teamIsJustSpace = teamName === " ";
    if (!teamisCharactersOrDash)
      errorMsg +=
        "Team name must only be comprised of characters spaces and dashes\n";
    if (!teamisRequiredLength)
      errorMsg += "Team name must be between 1 and 30 characters\n";
    if (!lessThanTwoWhitespace)
      errorMsg += "Team name must not have consecutive spaces\n";
    if (teamIsJustSpace) errorMsg += "Team name must be more just one space\n";
    if (
      teamisCharactersOrDash &&
      teamisRequiredLength &&
      lessThanTwoWhitespace &&
      !teamIsJustSpace
    ) {
      AddTeam(state, state.selectedTourId, teamName, dispatch).then(
        (response) => {
          if (response !== undefined) {
            if (response.status === 201) {
              props.notify("Successfully Added Team.");
            } else {
              props.notify(
                response.response.data.msg || "Something went wrong."
              );
            }
          } else {
            props.notify("Something went wrong.");
          }
        }
      );
    } else {
      props.notify(errorMsg);
    }
    setTeamName("");
    errorMsg = "";
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
                        let rege = new RegExp(/^[A-Za-z\s-]+$/);
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
              let rege = new RegExp(/^[A-Za-z\s-]+$/);
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
              let rege = new RegExp(/^[A-Za-z\s-]+$/);
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
