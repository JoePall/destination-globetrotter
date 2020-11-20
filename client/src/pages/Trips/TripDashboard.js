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
      <Row className="mb-5">
        {apiHandler({
          path: "/api/trip/" + id,
          component: ({response}) => {
            return <div className="mx-auto text-center">
              <h1 className="mx-auto text-center">{response.length > 0 ? response[0].location : ""}</h1>
              {response.length > 0 ? response.start ? <h3>DEPARTING: {response.start}{response.end ? <span>RETURNING: {response.end}</span> : ""}</h3> : "" : ""}
            </div>;
          },
        })}
      </Row>
      <Row className="bg-light py-5">
        <Col md={12} lg={12} className="m-0 p-0">
          <Bookmarks id={id} />
        </Col>
        <Col md={12} lg={6} className="m-0 p-0">
          <People id={id} />
        </Col>
        <Col md={12} lg={6} className="m-0 p-0">
          <Messages id={id} />
        </Col>
      </Row>
    </Container>
  );
}

export default TripDashboard;


