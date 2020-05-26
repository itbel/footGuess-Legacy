import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import { AuthContext } from "../App";

const CreateTournament = () => {
  const { state: authState } = useContext(AuthContext);
  const [name, setName] = useState(undefined);
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(
      "http://localhost:3001/tournaments/createtournament",
      {
        name: name,
        owner: authState.userid,
      },
      { timeout: 2000 }
    )
      .then((response) => {
        alert(`${name} created.`);
        setName("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="justify-content-center"
      style={{
        backgroundColor: "#25282A",
        borderRadius: "16px 16px 16px 16px",
        height: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <h1>Create Tournament</h1>
      <Form className="w-25">
        <Form.Group>
          <Form.Label>Tournament Name</Form.Label>
          <Form.Control
            value={name}
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Button
          onClick={(event) => handleSubmit(event)}
          variant="dark"
          type="submit"
        >
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateTournament;
