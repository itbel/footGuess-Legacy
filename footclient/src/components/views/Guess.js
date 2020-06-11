import React from "react";
import { Row } from "react-bootstrap";
import GuessTable from "./GuessTable";
import AddGuessModal from "../views/AddGuessModal";
const Guess = () => {
  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "4px 4px 4px 4px",
        minHeight: "50vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Row className="justify-content-center">
        <h1>Guesses</h1>
      </Row>
      <GuessTable />
      <Row className="justify-content-center">
        <AddGuessModal></AddGuessModal>
      </Row>
    </div>
  );
};

export default Guess;
