import React from "react";
import { Jumbotron, Col, Row, Container } from "react-bootstrap";

function NoMatches() {
  return (
    <Container>
      <Row>
        <Col size="md-12 bg-warning">
          <Jumbotron>
            <h1>404 Page Not Found</h1>
            <h1>🙄</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatches;
