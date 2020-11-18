import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import "./style.css";
import { useHistory } from "react-router-dom";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";
import moment from "moment";
import TripItems from "./TripItems";

function Trips(props) {
  if (props.id) {
    return Trip(props.id);
  }
  
  else {
    return TripItems();
  }
}

export default Trips;
