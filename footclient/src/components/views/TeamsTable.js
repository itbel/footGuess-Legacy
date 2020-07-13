import { Table, Button, Row, Pagination } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Store";
import FetchTeams from "../functional/FetchTeams";
import RemoveTeam from "../functional/RemoveTeam";

const TeamsTable = () => {
  const [state, dispatch] = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchTeams(state, dispatch);
      if (state.teams.length > 0) {
        let tempArr = [];
        state.teams.map((value, entry) => {
          if (entry % 5 === 0) {
            tempArr.push(state.teams.slice(entry, entry + 5));
          }
          return null;
        });
        setTeams(tempArr);
      }
    }
  }, [state.teams]);

  return (
    <Row className="justify-content-center">
      <Table bordered striped variant="light" size="sm">
        <tbody>
          {teams !== undefined &&
          teams.length > 0 &&
          teams[currentPage] !== undefined ? (
            teams[currentPage].map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.teamName}</td>
                  <td className="d-table-cell w-25">
                    <Button
                      variant="dark"
                      onClick={() => {
                        if (teams[currentPage].length === 1) {
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
                  {teams.map((val, key) => {
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
