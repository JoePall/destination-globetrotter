import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./style.css";

function Messages() {
  return (
    <Container fluid="lg">
      <Row>
        <Col xl="2">
          <h1>MESSAGES</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Messages;