import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import { Get } from "react-axios";
import Loading from "../../../components/Loading";
import Invite from "../../Friends/components/invite";

function People(tripId) {
  return (
    <Container fluid className="py-4 m-0">
      <h3 className="mx-auto text-center">People</h3>
      <Get url={"/api/usersbytrip/" + tripId}>
        {(error, response, makeRequest) => {
          if (error) {
            return (
              <Alert className="mx-auto alert alert-danger text-center">
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
                {response.data.map((item) => (
                  <Toast
                    bg="light"
                    key={item.id}
                    className="p-3 my-3 w-100 mx-auto"
                  >
                    {item.firstName + " " + item.lastName}
                  </Toast>
                ))}
                <Toast className="p-3 border border-warning mx-auto">
                  <Invite props={tripId} />
                </Toast>
              </Container>
            );
          }
          return <Loading />;
        }}
      </Get>
    </Container>
  );
}

export default People;
