import React from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import "./style.css";
import apiHandler from "../../utils/apiHandler";
import DisplayFlight from "../Search-Flights/DisplayFlight";

function TripDashboard(id) {
  return (
    <Container>
      <Row>
        <Col>
        <h3>Bookmarks</h3>
        {apiHandler({
          path: "/api/bookmarksbytrip/" + id,
          component: (response) => {
            console.log(response);
            return DisplayFlight({result: response.response[0].data});
          }
        })}
        </Col> 
        <Col>
        <h3>People</h3>
        {apiHandler({
          path: "/api/usersbytrip/" + id,
          component: (response) => (
            <Card bg="light" className="col-7 mx-auto">
              {console.log(response.response)}
              {response.response.map((item) => (
                <span key={item.id} className="btn btn-outline-primary rounded-pill mx-auto p-2 m-2">
                  {item.firstName + " " + item.lastName}
                </span>
              ))}
            </Card>
          ),
        })}
        </Col>  
        <Col>
        <h3>Messages</h3>
        {apiHandler({
          path: "/api/messagesbytrip/" + id,
          component: (response) => (
            <Card bg="light" className="col-7 mx-auto">
              {console.log(response.response)}
              {response.response.map((item) => (
                <span key={item.id} className="btn btn-primary rounded-pill mx-auto p-2 m-2">
                  {JSON.stringify(item)}
                </span>
              ))}
            </Card>
          ),
        })}
        </Col>
      </Row>  
    </Container>
  );
}

export default TripDashboard;
