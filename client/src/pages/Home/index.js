import React, { useState } from "react";
import Logo from "../../images/better-logo.png";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./style.css";
import Select from "react-select";
import options from "../../utils/codes.json";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  let location = "";

  return (
    <Container fluid="lg" className="p-4">
      <Card className="animate__animated animate__fadeInUpBig text-center mx-auto p-5 m-5">
        <h1 className="animate__animated animate__fadeIn mx-auto">Welcome to</h1>
        <img
          src={Logo}
          alt="Destination Globetrotter logo"
          className="mx-auto"
        ></img>
        <h4 className="text-center mx-auto">Grab a friend and let's go Places!</h4>
      </Card>

      <Row>
        <Col>
          <Select
            placeholder=" Going places?"
            options={options.map((option) => {
              return {
                value: option[option.length - 1],
                label: option[0].trim() + ", " + option[1].trim() + (option.length === 2 ? option[2] : "") + " - " + option[option.length - 1], 
                search: option[0].split(" ")[0]
              };
            })}
            className="input"
            onChange={(e) => {
              console.log(e);
              location = e;
            }}
          />
        </Col>
        <Button onClick={() => {
          history.push({ pathname: '/search-flights', state: { location: location } });
        }}>
          Let's go Places!
        </Button>
      </Row>
    </Container>
  );
}

export default Home;
