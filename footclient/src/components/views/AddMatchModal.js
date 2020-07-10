import { Modal, Row, Button, Form, Dropdown, Col } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Store";
import FetchTeams from "../functional/FetchTeams";
import AddMatch from "../functional/AddMatch";

const AddMatchModal = () => {
  const [state, dispatch] = useContext(Context);

  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [round, setRound] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    AddMatch(teamA, teamB, round, state.selectedTourId, dispatch);
  };

  useEffect(() => {
    FetchTeams(state, dispatch)
      .then((response) => {
        setTeams(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show, state, dispatch]);
  return (
    <>
      <Button
        disabled={state.teams[0] === undefined || state.teams.length < 2}
        variant="dark"
        onClick={handleShow}
      >
        Add Match
      </Button>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h1 className="text-center w-100">Add Match</h1>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Row className="justify-content-center pt-3">
              <h3>Add Match:</h3>
            </Row>
            <Row className="ml-3 pt-3">
              <Col>
                {teamA || `Select Team 1`}
                <Dropdown>
                  <Dropdown.Toggle variant="dark">
                    {teamA === "" ? "Team 1" : teamA}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ maxHeight: "35vh", overflowY: "auto" }}
                  >
                    {teams !== undefined && teams.length > 0
                      ? teams.map((val, key) => {
                          if (teamA === val.teamName || teamB === val.teamName)
                            return null;
                          else
                            return (
                              <Dropdown.Item
                                key={key}
                                onClick={() => {
                                  setTeamA(val.teamName);
                                }}
                              >
                                {val.teamName}
                              </Dropdown.Item>
                            );
                        })
                      : null}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                {teamB || `Select Team 2`}
                <Dropdown>
                  <Dropdown.Toggle variant="dark">
                    {teamB === "" ? "Team 2" : teamB}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ maxHeight: "35vh", overflowY: "auto" }}
                  >
                    {teams !== undefined && teams.length > 0
                      ? teams.map((val, key) => {
                          if (teamA === val.teamName || teamB === val.teamName)
                            return null;
                          else
                            return (
                              <Dropdown.Item
                                key={key}
                                onClick={() => {
                                  setTeamB(val.teamName);
                                }}
                              >
                                {val.teamName}
                              </Dropdown.Item>
                            );
                        })
                      : null}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                Round
                <Form.Control
                  value={round}
                  name="round"
                  onChange={(e) => {
                    setRound(e.target.value);
                  }}
                  className="justify-content-start pt-0"
                  style={{ width: "40%" }}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
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

export default AddMatchModal;
