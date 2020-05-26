import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Axios from "axios";
const TournamentsTable = () => {
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    Axios.get(
      "http://localhost:3001/tournaments/gettournaments",
      {},
      { timeout: 2000 }
    )
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Table style={{ color: "white", width: "20%", backgroundColor: "gray" }}>
      <thead>
        <th>Tournament Name</th>
        <th>Join</th>
      </thead>
      <tbody>
        {tournaments.map((val, key) => {
          return (
            <tr>
              <td>{val.name}</td>
              <td>
                <Button variant="dark">Join</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TournamentsTable;
