import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import api from "../../../utils/API";
import Select from "react-select";
import { Get } from "react-axios";
import Loading from "../../../components/Loading";

function Invite(props) {
  const [state, setState] = useState({});
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <Get url={"/api/user/"}>
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
          console.log(JSON.stringify(response));
          return (
            <Container fluid className="text-center">
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
                  let pending = {
                    requesterId: user.id,
                    requestedId: state.person,
                    tripId: props.tripId,
                  };

                  console.log(pending);

                  api.pending
                    .create(pending)
                    .then((res) => {
                      setState({ ...state, success: "Sent!", showing: true });
                      setTimeout(function () {
                        setState({ ...state, showing: false });
                      }, 3000);
                    });
                }}
              >
                Invite
              </button>
              {state.showing ? <Alert>{state.success}</Alert> : ""}
            </Container>
          );
        }
        return <Loading />;
      }}
    </Get>
  );
}

export default Invite;
