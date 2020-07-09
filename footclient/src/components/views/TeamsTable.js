import { Table, Button, Row, Pagination } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Store";
import FetchTeams from "../functional/FetchTeams";
import RemoveTeam from "../functional/RemoveTeam";

const TeamsTable = () => {
  const [state, dispatch] = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [matches, setMatches] = useState([]);
  const [wasFetched, setWasFetched] = useState(false);

  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchTeams(state, dispatch).then((response) => {
        if (response.length > 0) {
          let tempArr = [];
          response.map((value, entry) => {
            if (entry % 5 === 0) {
              tempArr.push(response.slice(entry, entry + 5));
            }
            return null;
          });
          setMatches(tempArr);
          setWasFetched(true);
        } else {
          setMatches([]);
        }
      });
    }
  }, [state.teams]);

  return (
    <Row className="justify-content-center">
      <Table bordered striped variant="light" size="sm">
        <tbody>
          {matches !== undefined &&
          matches.length > 0 &&
          matches[currentPage] !== undefined &&
          wasFetched ? (
            matches[currentPage].map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.teamName}</td>
                  <td className="d-table-cell w-25">
                    <Button
                      variant="dark"
                      onClick={() => {
                        if (matches[currentPage].length === 1) {
                          if (currentPage !== 0)
                            setCurrentPage(currentPage - 1);
                        }
                        RemoveTeam(val._id, state, dispatch);
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
              <td colSpan={4}>No teams found</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
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

export default TeamsTable;
