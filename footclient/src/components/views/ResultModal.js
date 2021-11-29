import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import AddResult from "../functional/AddResult";
import { Context } from "../Store";

const ResultModal = (props) => {
  const [state, dispatch] = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [teamAResult, setTeamAResult] = useState(
    props.selectedMatch.teamAResult !== null
      ? props.selectedMatch.teamAResult
      : 0
  );
  const [teamBResult, setTeamBResult] = useState(
    props.selectedMatch.teamBResult !== null
      ? props.selectedMatch.teamBResult
      : 0
  );
  const handleSubmit = () => {
    AddResult(
      state,
      dispatch,
      props.selectedRound,
      state.selectedTourId,
      props.selectedMatch._id,
      teamAResult,
      teamBResult
    ).then((response) => {
      if (response !== undefined && response.status === 200) {
        props.notify("Sucessfully Added Result.");
      } else {
        props.notify(response?.response?.data.msg || "Something went wrong.");
      }
    });
    handleClose();
  };
  useEffect(() => {
    setTeamAResult(
      props.selectedMatch.teamAResult !== null
        ? props.selectedMatch.teamAResult
        : 0
    );
    setTeamBResult(
      props.selectedMatch.teamBResult !== null
        ? props.selectedMatch.teamBResult
        : 0
    );
  }, [show, props.selectedMatch.teamAResult, props.selectedMatch.teamBResult]);

  return (
    <>
      <button
        style={{
          backgroundColor: "#25282a",
          borderRadius: "4px 4px 4px 4px",
          color: "#efefef",
          padding: "2px",
          margin: "2px",
          fontSize: "0.8em",
        }}
        onClick={handleShow}
      >
        Update
      </button>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h1 className="text-center w-100">Match</h1>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Row className="justify-content-end p-0 m-0">
                <h3>{props.selectedMatch.teamAName}</h3>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-end">
                <Form.Control
                  onChange={(event) => {
                    setTeamAResult(event.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (
                        teamAResult !== "" &&
                        teamBResult !== "" &&
                        teamAResult !== undefined &&
                        teamBResult !== undefined
                      ) {
                        if (
                          /^\d*$/.test(teamAResult) &&
                          /^\d*$/.test(teamAResult)
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
                  value={teamAResult}
                ></Form.Control>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-center m-auto">
                <h3>X</h3>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-start p-0">
                <Form.Control
                  onChange={(event) => {
                    setTeamBResult(event.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (
                        teamAResult !== "" &&
                        teamBResult !== "" &&
                        teamAResult !== undefined &&
                        teamBResult !== undefined
                      ) {
                        if (
                          /^\d*$/.test(teamAResult) &&
                          /^\d*$/.test(teamAResult)
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
                  value={teamBResult}
                ></Form.Control>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-start">
                <h3>{props.selectedMatch.teamBName}</h3>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e) => {
              if (
                teamAResult !== "" &&
                teamBResult !== "" &&
                teamAResult !== undefined &&
                teamBResult !== undefined
              ) {
                if (/^\d*$/.test(teamAResult) && /^\d*$/.test(teamAResult))
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
            Update
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResultModal;
