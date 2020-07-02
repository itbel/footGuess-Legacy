import { Table, Container } from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Store";
import FetchRoundResult from "../functional/FetchRoundResult";

const PointsTable = () => {
  const [state] = useContext(Context);
  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchRoundResult().then((response) => {
        console.log(response);
      });
    }
  }, [state]);
  return (
    <Container>
      <Table striped hover variant="light">
        <thead>
          <tr>
            <th>Match</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="justify-content-center d-flex">Points</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PointsTable;
