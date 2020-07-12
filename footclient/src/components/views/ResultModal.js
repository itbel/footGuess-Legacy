import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import AddResult from "../functional/AddResult";
import { Context } from "../Store";

const ResultModal = (props) => {
  const [state] = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [teamAResult, setTeamAResult] = useState(
    props.selectedMatch.teamAResult
  );
  const [teamBResult, setTeamBResult] = useState(
    props.selectedMatch.teamBResult
  );
  const handleSubmit = () => {
    AddResult(
      state.selectedTourId,
      props.selectedMatch._id,
      teamAResult,
      teamBResult
    ).then((response) => {
      console.log(response);
    });
    handleClose();
    props.handler(); // update parent
  };
  useEffect(() => {
    setTeamAResult(props.selectedMatch.teamAResult);
    setTeamBResult(props.selectedMatch.teamBResult);
  }, [show, props.selectedMatch.teamAResult, props.selectedMatch.teamBResult]);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Update
      </Button>
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
                      handleSubmit(e);
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
                      handleSubmit(e);
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
            onClick={() => {
              handleSubmit();
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
