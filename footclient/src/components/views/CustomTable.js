import { Table, Form, Button } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import FetchMatches from "../functional/FetchMatches";
import { AuthContext } from "../../App";
import RemoveMatch from "../functional/RemoveMatch";

const CustomTable = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [headers] = useState(["Team1", "Team2", "Round"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [arr, setArr] = useState([]);
  const [wasFetched, setWasFetched] = useState(false);

  useEffect(() => {
    console.log("Custom Table Mounted. Fetching Data");
    FetchMatches(authState, dispatch).then((response) => {
      if (response.length !== 0) {
        let tempArr = [];
        response.map((value, entry) => {
          if (entry % 5 === 0) {
            tempArr.push(response.slice(entry, entry + 5));
          }
        });
        setArr(tempArr);
        setWasFetched(true);
      }
    });
  }, [wasFetched]);

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
      <Table size="sm" bordered striped variant="light">
        <thead>
          <tr>
            {headers.map((val, key) => {
              return <th key={key}>{val}</th>;
            })}
            <th colSpan={1}></th>
          </tr>
        </thead>
        <tbody>
          {console.log(wasFetched)}
          {console.log(arr.length)}
          {arr.length > 0
            ? arr[currentPage].length > 0 && wasFetched
              ? arr[currentPage].map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.teamAName}</td>
                      <td>{val.teamBName}</td>
                      <td>{val.round}</td>
                      <td className="d-table-cell w-25">
                        <Button
                          variant="dark"
                          onClick={() => {
                            RemoveMatch(val._id, dispatch);
                            dispatch({
                              type: "UPDATE_MATCHES",
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })
              : "Not Loaded"
            : "Not Loaded"}
          {arr.length > 0 ? (
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
                  {arr.length > 0 ? (
                    arr[currentPage].length > 0 && wasFetched ? (
                      arr.map((val, index) => {
                        return <option key={index}>{index}</option>;
                      })
                    ) : (
                      "Not Loaded"
                    )
                  ) : (
                    <tr>
                      <td colSpan={4}>No Results</td>
                    </tr>
                  )}
                </Form.Control>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={4}>No Results</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
