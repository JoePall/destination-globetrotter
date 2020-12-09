import React from "react";
import Container from "react-bootstrap/Container";
import { Get } from "react-axios";
import Error from "../Error";
import Loading from "../../components/Loading";

function TripItem(props) {
  return (
    <Get url={"/api/trip/" + props.tripId}>
      {(error, response) => {
        if (error) {
          return <Error />;
        } else if (response !== null) {
          if (response.data.location) {
            return (
              <Container fluid>
                <h4>{response.data.location}</h4>
                <h5>
                  {response.data.start ? response.data.start : ""}
                  {response.data.end ? " - " + response.data.end : ""}
                </h5>
              </Container>
            );
          } else {
            return <></>;
          }
        }
        return <Loading />;
      }}
    </Get>
  );
}

export default TripItem;
