import { Table, Form, Button } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import FetchMatches from "../functional/FetchMatches";
import { AuthContext } from "../../App";
import RemoveMatch from "../functional/RemoveMatch";

const MatchesTable = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [headers] = useState(["Team1", "Team2", "Round"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [arr, setArr] = useState([]);
  const [wasFetched, setWasFetched] = useState(false);

  useEffect(() => {
    console.log("Matches Table Mounted. Fetching Data");
    if (authState.selectedTourId !== undefined) {
      FetchMatches(authState, dispatch).then((response) => {
        if (response.length > 0) {
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
  }, [authState.matches, dispatch, authState]);

  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "4px 4px 4px 4px",
        minHeight: "60vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Table bordered striped variant="light" size="sm">
        <thead>
          <tr>
            {headers.map((val, key) => {
              return <th key={key}>{val}</th>;
            })}
            <th colSpan={1}></th>
          </tr>
        </thead>
        <tbody>
          {arr !== undefined &&
          arr.length > 0 &&
          arr[currentPage] !== undefined &&
          wasFetched ? (
            arr[currentPage].map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.teamAName}</td>
                  <td>{val.teamBName}</td>
                  <td>{val.round}</td>
                  <td className="d-table-cell w-25">
                    <Button
                      variant="dark"
                      onClick={() => {
                        if (arr[currentPage].length === 1) {
                          if (currentPage !== 0)
                            setCurrentPage(currentPage - 1);
                        }
                        RemoveMatch(val._id, authState, dispatch);
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>No matches found</td>
            </tr>
          )}
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
    </div>
  );
};

export default MatchesTable;
