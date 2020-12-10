import React from "react";
import Logo from "../../images/better-logo.png";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./style.css";
import Select from "react-select";
import options from "../../utils/airports.json";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  let location = "";

  return (
    <Container fluid="lg" className="m-5 mx-auto animate__animated animate__fadeIn">
      <Card className="text-center bg-dark mx-auto p-5 m-5">
        <h1 className="mx-auto drop-shadow-light text-white">
          Welcome to
        </h1>
        <img
          src={Logo}
          alt="Destination Globetrotter logo"
          className="mx-auto drop-shadow-light"
        ></img>
        <Row>
          <Col lg={9} md={12}>
            <Select
              autoFocus
              placeholder="Going places?"
              options={options.map((option) => {
                return {
                  value: option[option.length - 1],
                  label:
                    option[0].trim() +
                    ", " +
                    option[1].trim() +
                    (option.length === 2 ? option[2] : "") +
                    " - " +
                    option[option.length - 1],
                  search: option[0].split(" ")[0],
                };
              })}
              className="input my-2"
              onChange={(e) => {
                console.log(e);
                location = e;
              }}
            />
          </Col>
          <Col lg={3} md={12}>
            <Button 
              className="btn w-100 h-75 my-2 btn-warning"
              onClick={() => {
                history.push({
                  pathname: "/search-flights",
                  state: { location: location },
                });
              }}>
              Let's travel! ✈
              </Button>
          </Col>
        </Row>
        <h2 className="text-center text-white mt-4 mb-0 mx-auto">
          Grab a friend and let's go see the world! ✈
        </h2>
      </Card>
    </Container>
  );
}

export default Home;
