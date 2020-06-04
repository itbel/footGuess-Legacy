import { Table, Form, Button } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import FetchMatches from "../functional/FetchMatches";
import { AuthContext } from "../../App";
import RemoveMatch from "../functional/RemoveMatch";

const CustomTable = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [headers, setHeaders] = useState(["Team1", "Team2", "Round"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([authState.matches]);
  const [arr, setArr] = useState([data]);
  const [wasFetched, setWasFetched] = useState(false);

  useEffect(() => {
    console.log("Custom Table Mounted. Fetching Data");
    FetchMatches(authState, dispatch).then((val) => {
      setData(val);
    });
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      let tempArr = [];
      console.log("Data was fetched. Paginating");
      console.log(data);
      data.map((val, entry) => {
        if (entry % 5 === 0) {
          tempArr.push(data.slice(entry, entry + 5));
        }
      });
      setArr(tempArr);
    }
  }, [data]);

  useEffect(() => {
    console.log(arr[currentPage]);
    setWasFetched(!wasFetched);
  }, [arr]);

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
              : "Not fetched"
            : "Not Fetched"}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
