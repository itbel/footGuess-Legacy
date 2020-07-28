import React, { useState, useEffect } from "react";
import { Col, ListGroup, Row, Container } from "react-bootstrap";
import Axios from "axios";
const Experimental = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [tourList, setTourList] = useState([]);

  useEffect(() => {
    if (tourList.length === 0)
      Axios.get(`${BASE_URL}/api/tournaments/select`, { timeout: 2000 })
        .then((response) => {
          setTourList(response.data);
        })
        .catch((error) => {});
  }, []);
  const selectTournament = (index) => {
    Axios.post(
      `${BASE_URL}/api/tournaments/addtour`,
      { id: tourList[index].id },
      { timeout: 2000 }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      <Container>
        <Row className="justify-content-center">
          <h1>Experimental</h1>
        </Row>
        <Row>
          <Col sm={12}></Col>
        </Row>
        <Row className="justify-content-center mt-1">
          <ListGroup>
            {tourList !== undefined
              ? tourList.map((value, key) => {
                  return (
                    <ListGroup.Item
                      onClick={() => selectTournament(key)}
                      key={key}
                      action
                      variant="dark"
                    >
                      {value.name} | {value.year} | {value.status}
                    </ListGroup.Item>
                  );
                })
              : null}
          </ListGroup>
        </Row>
      </Container>
    </div>
  );
};

export default Experimental;
