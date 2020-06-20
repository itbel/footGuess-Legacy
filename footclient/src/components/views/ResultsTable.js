import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../App";
import ResultsModal from "./ResultModal";
import { Dropdown, Table, Form, Row } from "react-bootstrap";
import FetchRound from "../functional/FetchRound";

const Results = () => {
  const { state: authState } = useContext(AuthContext);
  const [wasFetched, setWasFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [matches, setMatches] = useState([]);
  const [round, setRound] = useState(1);

  useEffect(() => {
    console.log("Reloading and fetching round");
    FetchRound(authState, round).then((response) => {
      if (response.length > 0) {
        let tempArr = [];
        response.map((value, entry) => {
          if (entry % 10 === 0) {
            tempArr.push(response.slice(entry, entry + 10));
          }
          return null;
        });
        setMatches(tempArr);
        setWasFetched(true);
      } else {
        setMatches([]);
      }
    });
  }, [round, currentPage, authState]);
  return (
    <Table responsive striped bordered hover variant="light" size="sm">
      <thead>
        <tr>
          <th colSpan={4} className="text-center">
            <Dropdown className="pl-2">
              <Dropdown.Toggle size="sm" variant="light">
                <b>Round: {round}</b>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: "35vh", overflowY: "auto" }}>
                <Dropdown.Item
                  name={1}
                  onClick={(e) => {
                    setCurrentPage(0);
                    setRound(parseInt(e.target.name));
                  }}
                >
                  1
                </Dropdown.Item>
                <Dropdown.Item
                  name={2}
                  onClick={(e) => {
                    setCurrentPage(0);
                    setRound(parseInt(e.target.name));
                  }}
                >
                  2
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </th>
        </tr>
      </thead>
      <tbody>
        {wasFetched ? (
          matches[currentPage].map((val, entry) => {
            return (
              <tr key={entry}>
                <td className="text-right">
                  <p>{val.teamAName}</p>
                </td>
                <td className="justify-content-center d-flex">
                  {val.teamAResult !== undefined ? val.teamAResult : ""}X
                  {val.teamBResult !== undefined ? val.teamBResult : ""}
                </td>
                <td className="text-left">
                  <p>{val.teamBName}</p>
                </td>
                <td>
                  <ResultsModal selectedMatch={val}></ResultsModal>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4}>No Results</td>
          </tr>
        )}
        {matches !== undefined && wasFetched ? (
          <tr>
            <td>
              <Form.Control
                value={currentPage}
                onChange={(e) => {
                  setCurrentPage(e.target.value);
                }}
                as="select"
                size="sm"
              >
                {matches !== undefined && wasFetched
                  ? matches.map((val, index) => {
                      return <option key={index}>{index}</option>;
                    })
                  : null}
              </Form.Control>
            </td>
          </tr>
        ) : null}
      </tbody>
    </Table>
  );
};

export default Results;
