import React from "react";
import { Alert, Container } from "react-bootstrap";
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
    <Container fluid>
      <Alert className="mx-auto card p-5 text-center">
        <h2>Trips</h2>
        {apiHandler({
          path: path,
          component: (response) => {
            return response.response.map(item => {
              return <TripItem key={item.id} item={item}></TripItem>;
            });
          },
        })}
      </Alert>
    </Container>
  );
}

export default TripItems;
