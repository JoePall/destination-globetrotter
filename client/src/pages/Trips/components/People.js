import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import { Get } from "react-axios";
import Loading from "../../../components/Loading";
import api from "../../../utils/API";
import Select from "react-select";

function People(tripId) {
  tripId = tripId.id ? tripId.id : tripId;

  return (
    <Container fluid className="py-4">
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
                <button
                  className="btn btn-danger"
                  onClick={() => makeRequest({ params: { reload: true } })}
                >Reload</button>
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
                <Toast className="p-3 mx-auto">
                  <Get url={"/api/user/"}>
                    {(error, response, makeRequest) => {
                      if (error) {
                        return (
                          <Alert className="mx-auto col-8 alert alert-danger text-center">
                            <h2>Sorry!</h2>
                            <hr />
                            <h4>
                              This is embarrassing ... and ... our app isn't
                              working right now.
                            </h4>
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                makeRequest({ params: { reload: true } })
                              }
                            >
                              Reload
                            </button>
                          </Alert>
                        );
                      } else if (response !== null) {
                        console.log(JSON.stringify(response));
                        return (
                          <Container fluid className="mx-auto text-center">
                            <Select
                              placeholder="Find a friend..."
                              options={response.data.map((item) => {
                                return {
                                  label: item.firstName + " " + item.lastName,
                                  value: item.id,
                                };
                              })}
                              className="input"
                              onChange={(e) => {
                                console.log(e.value);
                                const user = JSON.parse(
                                  sessionStorage.getItem("user")
                                );
                                api.pending
                                  .create({
                                    requesterId: user.id,
                                    requestedId: e.value,
                                    tripId: tripId,
                                  })
                                  .then((data) => {
                                    if (data)
                                      return (
                                        <Alert className="mx-auto col-8 alert alert-danger text-center">
                                          <h4>Friend Request Sent!</h4>
                                          <hr />
                                          <h5>{e.label}</h5>
                                        </Alert>
                                      );
                                  });
                                //TODO... ADD to pending table
                                // location = e;
                              }}
                            />
                          </Container>
                        );
                      }
                      return <Loading />;
                    }}
                  </Get>
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
