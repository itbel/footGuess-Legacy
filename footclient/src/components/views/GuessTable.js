import { Table, Form, Button, Row } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../App";
import FetchUserGuesses from "../functional/FetchUserGuesses";
import FetchMatches from "../functional/FetchMatches";
const MatchesTable = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [arr, setArr] = useState([]);
  const [wasFetched, setWasFetched] = useState(false);

  useEffect(() => {
    console.log("Guess Table Mounted. Fetching Data");
    if (authState.selectedTourId !== undefined) {
      FetchMatches(authState, dispatch).then((response) => {
        setMatches(response);
      });
      FetchUserGuesses(authState).then((response) => {
        if (response !== undefined) {
          let tempArr = [];
          response.map((value, entry) => {
            if (entry % 5 === 0) {
              tempArr.push(response.slice(entry, entry + 5));
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
  }, []);

  return (
    <Row className="justify-content-center">
      <Table
        style={{ width: "50%", padding: "0" }}
        bordered
        striped
        variant="light"
        size="sm"
      >
        <thead>
          <tr>
            <th>Team 1</th>
            <th>Team 2</th>
          </tr>
        </thead>
        <tbody>
          {arr !== undefined && arr[currentPage] !== undefined
            ? arr[currentPage].map((val, entry) => {
                return (
                  <tr>
                    <td>{val.teamAguess}</td>
                    <td>{val.teamBguess}</td>
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
