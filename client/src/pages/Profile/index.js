import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./style.css";

function Profile() {
  return (
    <Container fluid="lg">
      <Row>
        <Col xl="2">
          <h1>PROFILE</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;