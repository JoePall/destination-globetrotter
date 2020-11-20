import React from "react";
import Container from "react-bootstrap/Container";
import moment from "moment";

function TripItem(props) {
  return (
    <Container fluid>
      <a href={'/trips/' + props.item.id} className="btn btn-outline-warning text-dark m-3 p-3">
        <h3>{props.item.location}</h3>
        <h4>{props.item.start ? moment(props.item.start).format("DD/MM/YY") : ""}{props.item.end ? " - " + moment(props.item.end).format("DD/MM/YY") : ""}</h4>
      </a>
    </Container>
  );
}

export default TripItem;
