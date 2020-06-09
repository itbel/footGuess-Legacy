import { Modal, Row, Col, Table, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import AddResult from "../functional/AddResult";

const ResultModal = (val) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [teamAResult, setTeamAResult] = useState(val.selectedMatch.teamAResult);
  const [teamBResult, setTeamBResult] = useState(val.selectedMatch.teamBResult);
  const handleSubmit = () => {
    AddResult(val.selectedMatch._id, teamAResult, teamBResult).then(
      (response) => {
        console.log(response);
      }
    );
  };
  useEffect(() => {
    setTeamAResult(val.selectedMatch.teamAResult);
    setTeamBResult(val.selectedMatch.teamBResult);
  }, [show]);

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
                <h3>{val.selectedMatch.teamAName}</h3>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-end">
                <Form.Control
                  onChange={(event) => {
                    setTeamAResult(event.target.value);
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
                  value={teamBResult}
                ></Form.Control>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-start">
                <h3>{val.selectedMatch.teamBName}</h3>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleSubmit();
              handleClose();
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
