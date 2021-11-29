import { Modal, Button, Dropdown, Form, Row } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Store";
import FetchUnguessedMatches from "../functional/FetchUnguessedMatches";
import AddGuess from "../functional/AddGuess";

const AddGuessModal = (props) => {
  const [state, dispatch] = useContext(Context);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState();
  const [teamAguess, setTeamAguess] = useState();
  const [teamBguess, setTeamBguess] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (teamAguess !== undefined && teamBguess !== undefined) {
      AddGuess(
        dispatch,
        state,
        props.round,
        teamAguess,
        teamBguess,
        selectedMatch._id,
        state.selectedTourId
      ).then((response) => {
        if (response !== undefined && response.status === 201) {
          props.notify("Successfully Added Guess.");
        } else {
          props.notify(response?.response.data.msg || "Something went wrong.");
        }
      });

      setTeamAguess(undefined);
      setTeamBguess(undefined);
      setSelectedMatch(undefined);
    } else {
      props.notify("Guesses must entered");
    }
  };

  useEffect(() => {
    if (state.selectedTourId !== undefined)
      FetchUnguessedMatches(
        state,
        dispatch,
        state.selectedTourId,
        props.round
      ).then((response) => {
        if (response !== undefined) {
          if (response.data !== undefined) setMatches(response.data);
          else {
            if (response?.response?.status === 401) {
              props.notify(
                response?.response?.data.msg || "Something went wrong."
              );
            }
          }
        }
      });
  }, [show, state.guesses, props.round]);

  return (
    <>
      <Button
        variant="light"
        disabled={matches !== undefined && matches.length === 0}
        style={{
          visibility:
            matches !== undefined && matches.length === 0
              ? "hidden"
              : "visible",
        }}
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
              <Dropdown.Toggle
                disabled={matches !== undefined && matches.length === 0}
                variant="secondary"
                id="dropdown-basic"
              >
                {selectedMatch !== undefined
                  ? selectedMatch.teamAName + " X " + selectedMatch.teamBName
                  : "Matches"}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ maxHeight: "35vh", overflowY: "auto" }}>
                {matches !== undefined
                  ? matches.map((val, key) => {
                      return (
                        <Dropdown.Item
                          key={key}
                          onClick={() => setSelectedMatch(val)}
                        >
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (
                        teamAguess !== "" &&
                        teamBguess !== "" &&
                        teamAguess !== undefined &&
                        teamBguess !== undefined
                      ) {
                        if (
                          /^\d*$/.test(teamAguess) &&
                          /^\d*$/.test(teamBguess)
                        )
                          handleSubmit(e);
                        else {
                          props.notify("Fields must be numbers");
                        }
                      } else {
                        props.notify("Fields cannot be empty.");
                      }
                    }
                  }}
                  style={{ width: "15%" }}
                ></Form.Control>
                <p className="mt-auto mb-auto font-weight-bold ml-3 mr-3">X</p>
                <Form.Control
                  onChange={(e) => {
                    setTeamBguess(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (
                        teamAguess !== "" &&
                        teamBguess !== "" &&
                        teamAguess !== undefined &&
                        teamBguess !== undefined
                      ) {
                        if (
                          /^\d*$/.test(teamAguess) &&
                          /^\d*$/.test(teamBguess)
                        )
                          handleSubmit(e);
                        else {
                          props.notify("Fields must be numbers");
                        }
                      } else {
                        props.notify("Fields cannot be empty.");
                      }
                    }
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
              if (
                teamAguess !== "" &&
                teamBguess !== "" &&
                teamAguess !== undefined &&
                teamBguess !== undefined
              ) {
                if (/^\d*$/.test(teamAguess) && /^\d*$/.test(teamBguess))
                  handleSubmit(e);
                else {
                  props.notify("Fields must be numbers");
                }
              } else {
                props.notify("Fields cannot be empty.");
              }
            }}
            variant="dark"
          >
            Add Another
          </Button>
          <Button
            onClick={(e) => {
              if (
                teamAguess !== "" &&
                teamBguess !== "" &&
                teamAguess !== undefined &&
                teamBguess !== undefined
              ) {
                if (/^\d*$/.test(teamAguess) && /^\d*$/.test(teamBguess))
                  handleSubmit(e);
                else {
                  props.notify("Fields must be numbers");
                }
              } else {
                props.notify("Fields cannot be empty.");
              }
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
