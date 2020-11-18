import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";
import moment from "moment";

function TripItem(props) {
  return (
    <Button onClick={() => {
      console.log(props.item.id);
    }} className="col-7 btn btn-light m-3 p-3 mx-auto">
      <h3>{props.item.location}</h3>
      <h4>{props.item.start ? moment(props.item.start).format("DD/MM/YY") : ""}{props.item.end ? " - " + moment(props.item.end).format("DD/MM/YY") : ""}</h4>
    </Button>
  );
}

export default TripItem;
