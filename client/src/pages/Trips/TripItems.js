import React from "react";
import { Alert, Container } from "react-bootstrap";
import TripItem from "./TripItem";
import { Get } from "react-axios";
import Loading from "../../components/Loading";

function TripItems() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const path = "/api/tripsbyuser/" + user.id;

  return (
    <Container fluid>
      <Alert className="mx-auto card p-5 text-center">
        <h2>Trips</h2>
        <Get url={path}>
          {(error, response) => {
            if (error) {
              return (
                <Alert className="mx-auto col-8 alert alert-danger text-center">
                  <h2>Sorry!</h2>
                  <hr />
                  <h4>
                    This is embarrassing ... and ... our app isn't working right
                    now.
                  </h4>
                </Alert>
              );
            } else if (response !== null) {
              return (
                <Container fluid>
                  {response.data.map((trip) => (
                    <a
                    key={trip.id}
                    href={"/trips/" + trip.id}
                    className="btn btn-outline-warning text-dark m-3 p-3"
                    >
                      <TripItem tripId={trip.id} />
                    </a>
                  ))}
                  {(response.data.length <= 0) ? <section className="mt-3"><span>No trips planned? </span><a className="btn m-2 p-2 btn-outline-warning" href="/search-flights">Find a Flight</a><span> now!</span></section> : ""}
                </Container>
              );
            }
            return <Loading />;
          }}
        </Get>
      </Alert>
    </Container>
  );
}

export default TripItems;
