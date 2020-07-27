import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../Store";
import RankingTable from "../views/RankingTable";
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
      <Container>
        <Row className="justify-content-center">
          <h1>Home</h1>
        </Row>
        <Row className="justify-content-center">
          {state.selectedTourName !== undefined ? (
            <>
              <h1>{state.selectedTourName}</h1>
              <RankingTable></RankingTable>
            </>
          ) : null}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
