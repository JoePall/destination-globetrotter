import React from "react";
import { Card, Col, Jumbotron, Row } from "react-bootstrap";
import "./style.css";
import SearchFlights from "../Search-Flights";
import Messages from "../Messages";
import { useHistory } from "react-router-dom";

function Trips() {
  const history = useHistory();

  

  return (
    <Jumbotron>
      <h1><b></b></h1>
      <Row>
        <Col>
          <Card>
            <SearchFlights className="p-5" />
          </Card>
        </Col>
        <Col>
          <Card>
            <Messages className="p-5" />
          </Card>
        </Col>
      </Row>
    </Jumbotron>
  );
}

export default Trips;