import React, { useEffect, useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { AuthContext } from "../App";

const TournamentsTable = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    let arr = [];
    let entries = Object.entries(authState.joinedTournaments);
    for (let entry of entries) {
      arr.push(entry[1].name);
    }
    setTournaments(arr);
  }, [authState.joinedTournaments, dispatch, setTournaments]);

  return (
    <Table style={{ color: "white", width: "20%", backgroundColor: "gray" }}>
      <thead>
        <tr>
          <th>Tournament Name</th>
          <th>Join</th>
        </tr>
      </thead>

      <tbody>
        {authState.allTournaments.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>
                <Button
                  disabled={
                    val.name ===
                    tournaments.find((element) => element === val.name)
                  }
                  onClick={() => {
                    alert(`selected ${val.name}`);
                  }}
                  variant="dark"
                >
                  {val.name ===
                  tournaments.find((element) => element === val.name)
                    ? "Joined"
                    : "Join"}
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TournamentsTable;
