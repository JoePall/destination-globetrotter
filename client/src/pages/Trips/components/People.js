import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Error from "../../Error";
import Alert from "react-bootstrap/Alert";
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
            return <Error />;
          } else if (response !== null) {
            console.log(response);
            return (
              <Container fluid className="p-3 text-center">
                <Alert
                  className="bg-light border border-warning p-3 my-3 w-100 mx-auto"
                >
                  {console.log(response)}
                {response.data.map((item, i) => <section className="text-center" key={item.id}><span>{item.firstName + " " + item.lastName}</span>{response.data.length - 1 === i ? "" : <hr />}</section>)}
                {response.data.length === 0 ? <section className="text-center">Let's invite someone...</section> : ""}
                </Alert>
                <Invite tripId={props.tripId} />
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
