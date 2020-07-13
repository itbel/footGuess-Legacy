import { Table, Button, Row, Pagination } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import FetchMatches from "../functional/FetchMatches";
import { Context } from "../Store";
import RemoveMatch from "../functional/RemoveMatch";

const MatchesTable = () => {
  const [state, dispatch] = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchMatches(state, dispatch);
      if (state.matches.length > 0) {
        let tempArr = [];
        state.matches.map((value, entry) => {
          if (entry % 5 === 0) {
            tempArr.push(state.matches.slice(entry, entry + 5));
          }
          return null;
        });
        setMatches(tempArr);
      } else {
        setMatches([]);
      }
    }
  }, [state.matches]);

  return (
    <Row>
      <Table
        style={{ padding: "0" }}
        bordered
        striped
        variant="light"
        size="sm"
      >
        <tbody>
          {matches !== undefined &&
          matches.length > 0 &&
          matches[currentPage] !== undefined ? (
            matches[currentPage].map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.teamAName}</td>
                  <td>{val.teamBName}</td>
                  <td>{val.round}</td>
                  <td className="d-table-cell w-25">
                    <Button
                      variant="dark"
                      onClick={() => {
                        if (matches[currentPage].length === 1) {
                          if (currentPage !== 0)
                            setCurrentPage(currentPage - 1);
                        }
                        RemoveMatch(val._id, state, dispatch);
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
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <Row className="justify-content-center m-0">
                <Pagination variant="dark">
                  {matches.map((val, key) => {
                    return (
                      <Pagination.Item
                        onClick={() => {
                          setCurrentPage(key);
                        }}
                        active={key === currentPage}
                        key={key}
                      >
                        {key + 1}
                      </Pagination.Item>
                    );
                  })}
                </Pagination>
              </Row>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Row>
  );
};

export default MatchesTable;
