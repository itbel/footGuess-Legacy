import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { Context } from "../Store";
import RankingTable from "../views/RankingTable";
import TotalWins from "../views/TotalWins";

const Home = (props) => {
  const [state, dispatch] = useContext(Context);

  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "4px 4px 4px 4px",
        minHeight: "50vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Row className="justify-content-center">
        {state.selectedTourName !== undefined ? (
          <div className="w-100 text-center">
            <h1>{state.selectedTourName}</h1>
            <h3>Tournament Standings</h3>
            <Row className="justify-content-center">
              <Col sm={12} lg={4}>
                <RankingTable></RankingTable>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <h1>Bolao-APP</h1>
            <p>Join a tournament to be able to select one.</p>
            <TotalWins></TotalWins>
          </div>
        )}
      </Row>
    </div>
  );
};

export default Home;
