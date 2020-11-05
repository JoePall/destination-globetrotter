import React from "react";
import { Jumbotron, Col, Row, Container } from "react-bootstrap";
import "./style.css";

function Trips() {
  return (
    <Container>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1><b>TRIPS</b></h1>
            <h1>🙄</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Trips;