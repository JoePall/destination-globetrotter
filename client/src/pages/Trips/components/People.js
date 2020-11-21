import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import { Get } from "react-axios";
import Loading from "../../../components/Loading";
import Invite from "../../Friends/components/invite";

function People(props) {
  return (
    <Container fluid className="py-4 m-0">
      <h3 className="mx-auto text-center">People</h3>
      <Get url={"/api/usersbytrip/" + props.tripId}>
        {(error, response) => {
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
            console.log(response);
            return (
              <Container fluid>
                <Toast
                  bg="light"
                  className="p-3 my-3 w-100 mx-auto"
                >
                  {console.log(response)}
                {response.data.map((item, i) => <section key={item.id}><span>{item.firstName + " " + item.lastName}</span>{response.data.length - 1 === i ? "" : <hr />}</section>)}
                </Toast>
                <Toast className="p-3 border border-warning mx-auto">
                  <Invite tripId={props.tripId} />
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
