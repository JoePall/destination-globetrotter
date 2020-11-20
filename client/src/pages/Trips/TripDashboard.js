import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Messages from "./components/Messages";
import Bookmarks from "./components/Bookmarks";
import People from "./components/People";
import TripItem from "./TripItem";

function TripDashboard(tripId) {
  return (
    <Container fluid className="mt-5">
      <Row className="mb-5 mx-auto text-center">
        <TripItem id={tripId} />
      </Row>
      <Row className="bg-light py-5">
        <Col md={12} lg={12} className="m-0 p-0">
          <Bookmarks id={tripId} />
        </Col>
        <Col md={12} lg={6} className="m-0 p-0">
          <People id={tripId} />
        </Col>
        <Col md={12} lg={6} className="m-0 p-0">
          <Messages id={tripId} />
        </Col>
      </Row>
    </Container>
  );
}

export default TripDashboard;


