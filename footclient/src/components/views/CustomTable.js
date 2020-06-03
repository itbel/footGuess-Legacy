import { Table, Form } from "react-bootstrap";
import React, { useState } from "react";
const CustomTable = (props) => {
  let headers = ["Team1", "Team2", "Round"];
  const [currentPage, setCurrentPage] = useState(0);
  let data = [
    {
      team1: "Botafogo",
      team2: "Flamengo",
      round: "1",
    },
    {
      team1: "Fluminense",
      team2: "Gremio",
      round: "1",
    },
    {
      team1: "Sao Paulo",
      team2: "Corinthians",
      round: "1",
    },
    {
      team1: "Santos",
      team2: "Vasco",
      round: "1",
    },
    {
      team1: "Internacional",
      team2: "Bragantino",
      round: "1",
    },
    {
      team1: "Atletico-MG",
      team2: "Bahia",
      round: "1",
    },
    {
      team1: "Fortaleza",
      team2: "Goias",
      round: "1",
    },
    {
      team1: "Palmeiras",
      team2: "Sport",
      round: "1",
    },
    {
      team1: "Coritiba",
      team2: "Ceara",
      round: "1",
    },
    {
      team1: "Atletico-PR",
      team2: "Bahia",
      round: "1",
    },
  ];
  let arr = [];
  data.map((val, entry) => {
    if (entry % 5 === 0) {
      arr.push(data.slice(entry, entry + 5));
    }
  });
  console.log(arr);
  return (
    <Table style={{ width: "50%" }} bordered striped variant="light">
      <thead>
        <tr>
          {headers.map((val, key) => {
            return <th key={key}>{val}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {arr[currentPage].map((val, key) => {
          console.log(val);
          return (
            <tr key={key}>
              <td>{val.team1}</td>
              <td>{val.team2}</td>
              <td>{val.round}</td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={3}>
            <Form.Control
              style={{ width: "10%" }}
              value={currentPage}
              onChange={(e) => {
                setCurrentPage(e.target.value);
              }}
              as="select"
              size="sm"
            >
              {arr.map((val, index) => {
                return <option key={index}>{index}</option>;
              })}
            </Form.Control>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CustomTable;
