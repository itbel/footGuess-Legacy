import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../App";
import ResultsModal from "./ResultModal";
import { Dropdown, Table, Form, Row } from "react-bootstrap";
import FetchRound from "../functional/FetchRound";
import FetchHighestRound from "../functional/FetchHighestRound";

const Results = () => {
  const { state: authState } = useContext(AuthContext);
  const [wasFetched, setWasFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [matches, setMatches] = useState([]);
  const [round, setRound] = useState(1);
  const [rounds, setRounds] = useState([]);
  useEffect(() => {
    console.log("Reloading and fetching round");
    FetchHighestRound(authState).then((response) => {
      if (response.length > 0) {
        let tempArr = [];
        for (let i = 1; i <= response[0].round; i++) {
          tempArr.push(i);
        }
        setRounds(tempArr);
      }
    });
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
    <>
      <Dropdown className="pl-2">
        <Dropdown.Toggle size="sm" variant="light">
          <b>Round: {round}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: "35vh", overflowY: "auto" }}>
          {rounds.map((val, key) => {
            return (
              <Dropdown.Item
                key={key}
                name={val}
                onClick={(e) => {
                  setCurrentPage(0);
                  setRound(parseInt(e.target.name));
                }}
              >
                {val}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Table
        style={{ marginTop: "16px" }}
        responsive
        striped
        bordered
        hover
        variant="light"
        size="sm"
      >
        <thead>
          <tr>
            <th colSpan={4} className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {matches !== undefined &&
          matches[currentPage] !== undefined &&
          wasFetched ? (
            matches[currentPage].map((val, entry) => {
              return (
                <tr key={entry}>
                  <td className="text-right">
                    <p>
                      <b>{val.teamAName}</b>
                    </p>
                  </td>
                  <td className="justify-content-center d-flex">
                    {val.teamAResult !== undefined ? (
                      <b>{val.teamAResult}</b>
                    ) : (
                      ""
                    )}
                    X
                    {val.teamBResult !== undefined ? (
                      <b>{val.teamBResult}</b>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-left">
                    <p>
                      <b>{val.teamBName}</b>
                    </p>
                  </td>
                  <td>
                    <ResultsModal selectedMatch={val}></ResultsModal>
                  </td>
                </tr>
              );
            })
          ) : (
            <>
              <tr>
                <td colSpan={4}>No Results</td>
              </tr>
              <tr>
                <td colSpan={4}>No Results</td>
              </tr>
              <tr>
                <td colSpan={4}>No Results</td>
              </tr>
              <tr>
                <td colSpan={4}>No Results</td>
              </tr>
              <tr>
                <td colSpan={4}>No Results</td>
              </tr>
            </>
          )}
          {matches !== undefined &&
          matches[currentPage] !== undefined &&
          wasFetched ? (
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
                  {matches.map((val, index) => {
                    return <option key={index}>{index}</option>;
                  })}
                </Form.Control>
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
    </>
  );
};

export default Results;
