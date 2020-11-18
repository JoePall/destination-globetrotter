import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import "./style.css";
import { useHistory } from "react-router-dom";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";
import moment from "moment";

function Trips(props) {
  if (props.id) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return Trip(props.id);
  }
  
  else {
    return TripItems();
  }
}

export default Trips;
