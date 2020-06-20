import { Table, Form, Button, Row, Dropdown } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../App";
import FetchUserGuesses from "../functional/FetchUserGuesses";
import FetchMatches from "../functional/FetchMatches";

const MatchesTable = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [arr, setArr] = useState([]);
  const [wasFetched, setWasFetched] = useState(false);
  const [round, setRound] = useState(1);

  useEffect(() => {
    console.log("Guess Table Mounted. Fetching Data");
    if (authState.selectedTourId !== undefined) {
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
          console.log(tempArr);
          setWasFetched(true);
        } else {
          setArr([]);
        }
      });
    }
  }, [round]);
  return (
    <Row className="justify-content-center">
      <Table responsive bordered striped variant="light" size="sm">
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
          <tr>
            <th>Match</th>
            <th>Guess</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {arr !== undefined && arr[currentPage] !== undefined
            ? arr[currentPage].map((val, entry) => {
                console.log(val);
                return (
                  <tr>
                    <td>
                      {val.teamAName} X {val.teamBName}
                    </td>
                    <td>
                      {val.teamAguess} X {val.teamBguess}
                    </td>
                    {typeof val.teamAResult !== undefined &&
                    typeof val.teamBResult !== undefined ? (
                      <td>
                        {val.teamAResult} X {val.teamBResult}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                );
              })
            : authState.selectedTourId === undefined
            ? "Tournament must be selected"
            : "No Results"}
          {arr !== undefined && arr.length > 0 ? (
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
          ) : (
            <tr>
              <td colSpan={4}></td>
            </tr>
          )}
        </tbody>
      </Table>
    </Row>
  );
};

export default MatchesTable;
