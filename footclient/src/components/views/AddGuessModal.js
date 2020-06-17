import { Modal, Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../App";
import FetchUnguessedMatches from "../functional/FetchUnguessedMatches";
import AddGuess from "../functional/AddGuess";

const AddGuessModal = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState();
  const [teamAguess, setTeamAguess] = useState();
  const [teamBguess, setTeamBguess] = useState();

  // Modal Functionality
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (teamAguess !== undefined && teamBguess !== undefined) {
      AddGuess(teamAguess, teamBguess, selectedMatch._id, authState).then(
        (response) => {
          console.log(response);
        }
      );
    }
  };

  useEffect(() => {
    FetchUnguessedMatches(authState).then((response) => {
      setMatches(response);
    });
  }, [show, selectedMatch]);

  return (
    <>
      <Button
        variant="dark"
        disabled={authState.selectedTourId === undefined}
        onClick={handleShow}
      >
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
        <Modal.Body>
          <Row className="justify-content-center">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedMatch !== undefined
                  ? selectedMatch.teamAName + " X " + selectedMatch.teamBName
                  : "Matches"}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ maxHeight: "35vh", overflowY: "auto" }}>
                {matches !== undefined
                  ? matches.map((val, entry) => {
                      return (
                        <Dropdown.Item onClick={() => setSelectedMatch(val)}>
                          {val.teamAName} x {val.teamBName}
                        </Dropdown.Item>
                      );
                    })
                  : "No Matches"}
              </Dropdown.Menu>
            </Dropdown>
          </Row>
          {selectedMatch !== undefined ? (
            <>
              <Row className="pt-3 justify-content-center">
                <p className="mt-auto mb-auto mr-3 font-weight-bold">
                  {selectedMatch.teamAName}
                </p>
                <Form.Control
                  onChange={(e) => {
                    setTeamAguess(e.target.value);
                  }}
                  style={{ width: "15%" }}
                ></Form.Control>
                <p className="mt-auto mb-auto font-weight-bold ml-3 mr-3">X</p>
                <Form.Control
                  onChange={(e) => {
                    setTeamBguess(e.target.value);
                  }}
                  style={{ width: "15%" }}
                ></Form.Control>
                <p className="mt-auto mb-auto ml-3 font-weight-bold">
                  {selectedMatch.teamBName}
                </p>
              </Row>
            </>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              handleSubmit(e);
              handleClose();
            }}
            variant="dark"
          >
            Add
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
