import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { AuthContext } from "../App";
import Axios from "axios";
const Landing = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    Axios.post(
      "http://localhost:3001/tournaments/gettournament",
      {
        userid: authState.userid,
      },
      { timeout: 2000 }
    )
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="landing">
      <h1>Landing Page</h1>
      <h6>
        {authState.isAuthenticated ? `Welcome ${authState.user}` : undefined}
      </h6>
      <h6></h6>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Tournaments
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {tournaments.map((val) => {
            console.log(val);
            return <Dropdown.Item>{val.name}</Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Landing;
