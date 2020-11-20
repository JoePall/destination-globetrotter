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

  const [ state, setState ] = useState({});
  const user = JSON.parse(sessionStorage.getItem("user"));

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
                                setState({ ...state, person: e.value });
                              }}
                            />
                            <button
                              className="btn btn-outline-warning w-100 p-2 my-3"
                              onClick={() => {
                                if (!state.person) return alert("No friend selected");
                                api.pending
                                  .create({
                                    requesterId: user.id,
                                    requestedId: state.person,
                                    tripId: tripId,
                                  }).then(res => {
                                    setState({ ...state, success: "Sent!", showing: true });
                                    setTimeout(function() {
                                      setState({ ...state, showing: false });
                                    }, 3000);
                                  });
                              }}
                            >
                              Invite
                            </button>
                            {(state.showing) ? <Alert>{state.success}</Alert> : ""}
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
