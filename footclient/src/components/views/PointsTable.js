import { Table, Container } from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Store";
import FetchRoundResult from "../functional/FetchRoundResult";

const PointsTable = () => {
  const [state] = useContext(Context);
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchRoundResult().then((response) => {
        for (let i = 0; i < response.length; i++) {
          console.log(response);
        }
      });
    }
  }, [state]);
  return (
    <Container>
      <Table striped hover variant="light">
        <thead>
          <tr>
            <th>Match</th>
            {matches !== undefined ? matches.map((entry, key) => {}) : null}
          </tr>
        </thead>
        <tbody>
          {matches !== undefined ? (
            matches.map((entry, key) => {
              return (
                <tr key={key}>
                  <td>
                    {entry.teamAName}
                    {entry.teamAResult !== undefined ? entry.teamAResult : null}
                    X
                    {entry.teamBResult !== undefined ? entry.teamBResult : null}
                    {entry.teamBName}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Nothing</td>
            </tr>
          )}
          <tr>
            <td className="justify-content-center d-flex">Points</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PointsTable;
