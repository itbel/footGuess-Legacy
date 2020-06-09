import { Modal, Row, Col, Table, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const ResultModal = (val) => {
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [teamAResult, setTeamAResult] = useState(val.selectedMatch.teamAResult);
  const [teamBResult, setTeamBResult] = useState(val.selectedMatch.teamBResult);
  useEffect(() => {
    console.log("Showing Modal");
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
                <Form.Control value={teamAResult}></Form.Control>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-center m-auto">
                <h3>X</h3>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-start p-0">
                <Form.Control value={teamBResult}></Form.Control>
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
          <Button variant="dark">Update</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResultModal;
