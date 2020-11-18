import React from "react";
import { Container } from "react-bootstrap";
import "./style.css";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";
import TripItem from "./TripItem";
import apiHandler from "../../utils/apiHandler";

function TripItems() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const path = "/api/tripsbyuser/" + user.id;
  console.log(path);

  return (
    <Container col="6" className="mx-auto">
      {apiHandler({
        path: path,
        component: (response) => {
          return response.response.map(item => {
            return <TripItem key={item.id} item={item}></TripItem>;
          });
        },
      })}
    </Container>
  );
}

export default TripItems;
