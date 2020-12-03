import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Messages from "./components/Messages";
import Bookmarks from "./components/Bookmarks";
import People from "./components/People";
import TripItem from "./TripItem";

function TripDashboard(props) {
  return (
    <Container fluid className="mt-5">
      <Row className="mb-5 mx-auto text-center">
        <TripItem tripId={props.tripId} />
      </Row>
      <Row className="bg-light my-3 py-3">
        <Col md={12} lg={12} className="m-0 p-0">
          <Bookmarks tripId={props.tripId} />
        </Col>
      </Row>
      <Row className="bg-warning my-3 py-3">
        <Col md={12} lg={6} className="m-0 p-0 vh-50">
          <People tripId={props.tripId} />
        </Col>
        <Col md={12} lg={6} className="m-0 p-0 vh-50">
          <Messages tripId={props.tripId} />
          {console.log(props.tripId)}
        </Col>
      </Row>
    </Container>
  );
}

export default TripDashboard;


