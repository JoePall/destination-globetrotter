import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./style.css";

function Profile() {
  return (
    <Container fluid="lg" className="p-4">
      <Row>
        <Col sm="6">
          <h1>PROFILE</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;