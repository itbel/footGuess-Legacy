import { Table, Form, Dropdown } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../App";
import FetchUserGuesses from "../functional/FetchUserGuesses";
import FetchHighestRound from "../functional/FetchHighestRound";

const MatchesTable = () => {
  const { state: authState } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [arr, setArr] = useState([]);
  const [wasFetched, setWasFetched] = useState(false);
  const [round, setRound] = useState(1);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    console.log("Guess Table Mounted. Fetching Data");
    if (authState.selectedTourId !== undefined) {
      FetchHighestRound(authState).then((response) => {
        if (response.length > 0) {
          let tempArr = [];
          for (let i = 1; i <= response[0].round; i++) {
            tempArr.push(i);
          }
          setRounds(tempArr);
        }
      });
      FetchUserGuesses(authState, round).then((response) => {
        if (response !== undefined) {
          let tempArr = [];
          response.map((value, entry) => {
            if (entry % 10 === 0) {
              tempArr.push(response.slice(entry, entry + 10));
            }
            return null;
          });
          setArr(tempArr);
          setWasFetched(true);
        } else {
          setArr([]);
        }
      });
    }
  }, [round]);
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
        bordered
        hover
        striped
        variant="light"
        size="sm"
      >
        <thead>
          <tr>
            <th colSpan={4} className="text-center"></th>
          </tr>
          <tr>
            <th className="text-center">Match</th>
            <th>Guess</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {arr !== undefined && arr[currentPage] !== undefined ? (
            arr[currentPage].map((val, entry) => {
              return (
                <tr>
                  <td className="text-center">
                    <b>
                      {val.teamAName} X {val.teamBName}
                    </b>
                  </td>
                  <td>
                    <b>
                      {val.teamAguess} X {val.teamBguess}
                    </b>
                  </td>
                  {typeof val.teamAResult !== undefined &&
                  typeof val.teamBResult !== undefined ? (
                    <td>
                      <b>
                        {val.teamAResult} X {val.teamBResult}
                      </b>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            })
          ) : authState.selectedTourId === undefined ? (
            <tr>
              <td>Tournament must be selected</td>
            </tr>
          ) : (
            <tr>
              <td colSpan={4}>No Results</td>
            </tr>
          )}
          {arr !== undefined && arr.length > 1 ? (
            <tr>
              <td colSpan={4}>
                <Form.Control
                  style={{ width: "20%" }}
                  value={currentPage}
                  onChange={(e) => {
                    setCurrentPage(e.target.value);
                  }}
                  as="select"
                  size="sm"
                >
                  {arr.length > 0 && wasFetched
                    ? arr.map((val, index) => {
                        return <option key={index}>{index}</option>;
                      })
                    : "No Results"}
                </Form.Control>
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
    </>
  );
};

export default MatchesTable;
