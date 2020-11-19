import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./style.css";
import apiHandler from "../../utils/apiHandler";
import Messages from "./components/Messages";
import Bookmarks from "./components/Bookmarks";
import People from "./components/People";

function TripDashboard(id) {
  return (
    <Container fluid className="mt-5">
      <Row>
        {apiHandler({
          path: "/api/trip/" + id,
          component: ({response}) => {
            return <div className="mx-auto text-center">
              <h1 className="mx-auto text-center">{response[0].location}</h1>
              {response[0].start ? <h3>DEPARTING: {response[0].start}</h3> : ""}
              {response[0].end ? <h3>RETURNING: {response[0].end}</h3> : ""}
            </div>;
          },
        })}
      </Row>
      <Row className="bg-light py-5">
        <Col className="m-0 p-0">
          <Bookmarks id={id} />
        </Col>
        <Col className="m-0 p-0">
          <People id={id} />
        </Col>
        <Col className="m-0 p-0">
          <Messages id={id} />
        </Col>
      </Row>
    </Container>
  );
}

export default TripDashboard;
