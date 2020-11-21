import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Get } from "react-axios";
import Loading from "../../components/Loading";

function TripItem(props) {
  return (
    <Get url={"/api/trip/" + props.tripId}>
    {(error, response, makeRequest) => {
        if (error) {
          return (
            <Alert className="mx-auto col-8 alert alert-danger text-center">
              <h2>Sorry!</h2>
              <hr />
              <h4>This is embarrassing ... and ... our app isn't working right now.</h4>
              <button
                className="btn btn-danger"
                onClick={() => makeRequest({ params: { reload: true } })}
              >Reload</button>
            </Alert>
          );
        } else if (response !== null) {
          console.log(response);
          
          return <Container fluid>
            <h4>{response.data.location}</h4>
            <h5>{response.data.start ? response.data.start : ""}{response.data.end ? " - " + response.data.end : ""}</h5>
          </Container>
        }
        return <Loading />;
      }}
    </Get>
  );
}

export default TripItem;
