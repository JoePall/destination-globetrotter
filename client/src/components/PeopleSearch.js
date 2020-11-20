import React from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { Get } from "react-axios";
import Loading from "../components/Loading";
import Select from "react-select";
import api from "../utils/API";

function PeopleSearch() {
  return (
    <Get url={"/api/user/"}>
      {(error, response, makeRequest) => {
        if (error) {
          return (
            <Alert className="mx-auto col-8 alert alert-danger text-center">
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
          console.log(JSON.stringify(response));
          return (
            <Container fluid className="mx-auto text-center">
              <Select
                placeholder="Find a friend..."
                options={response.data.map((item) => {
                  return { label: item.firstName + " " + item.lastName, value: item.id };
                })}
                className="input"
                onChange={(e) => {
                  console.log(e.value);
                  const user = JSON.parse(sessionStorage.getItem("user"));
                  api.pending.create({ requesterId: user.id, requestedId: e.value}).then(data => {
                    if (data) return <Alert className="mx-auto col-8 alert alert-danger text-center">
                    <h4>Friend Request Sent!</h4>
                    <hr />
                    <h5>{e.label}</h5>
                  </Alert>
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
  );
}

export default PeopleSearch;
