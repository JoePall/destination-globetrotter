import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Get } from "react-axios";
import Loading from "../../../components/Loading";
import api from "../../../utils/API";

function Pending(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const path = "/api/pendingtrips/" + user.id;

  return (
    <Get url={path}>
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
              >
                Reload
              </button>
            </Alert>
          );
        } else if (response !== null) {
          console.log(response);
          return response.data.map((item) => {
            console.log();
            return (
              <Container fluid key={item.pending.id}>
                <span className="mx-2">
                  {item.owner.firstName +
                    " " +
                    item.owner.lastName +
                    " has invited you!"}
                </span>
                <span>{item.trip.location}</span>
                <span>
                  <Button
                    className="btn btn-success m-2"
                    onClick={() => {
                      api.trip_user
                        .create({ userId: user.id, tripId: item.trip.id })
                        .then(() => {
                          api.pending.delete(item.pending.id).then((res) => {
                            console.log("Should change pages to: " + "/trips/" + item.trip.id);

                            let id = res.data.tripId ? res.data.tripId : "";
                            location.assign("/trips/" + id);
                          });
                        });
                    }}
                  >
                    Accept
                  </Button>
                  <Button className="btn btn-danger m-2" onClick={() => {
                    api.pending.delete(item.pending.id).then((res) => {
                      //TODO: handle ui
                    });
                  }}>
                    Reject
                  </Button>
                </span>
              </Container>
            );
          });
        }
        return <Loading />;
      }}
    </Get>
  );
}

export default Pending;
