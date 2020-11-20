import React from "react";
import Container from "react-bootstrap/Container";
import { Get } from "react-axios";
import Alert from "react-bootstrap/Alert";
import Loading from "../../../components/Loading";

function Messages(tripId) {
  tripId = tripId.id ? tripId.id : tripId;

  return (
    <Container fluid>
      <h3 className="mx-auto text-center">Messages</h3>
      <Get url={"/api/messagesfromtrip/" + tripId}>
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
                <p>
                  <button
                    class="btn btn-primary"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseError"
                    aria-expanded="false"
                    aria-controls="collapseError"
                  >
                    More details...
                  </button>
                </p>
                <div class="collapse" id="collapseError">
                  <div class="card card-body">
                    {JSON.stringify(error)}
                  </div>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => makeRequest({ params: { reload: true } })}
                >Reload</button>
              </Alert>
            );
          } else if (response !== null) {
            console.log(response);
            return response.data.map((item) => {
              return (
                <Alert
                  key={item.id}
                  className="mx-auto warning alert-warning text-center"
                >
                  <strong className="mr-auto">{item.name}</strong>
                  <hr />
                  <p>{item.text}</p>
                </Alert>
              );
            });
          }
          return <Loading />;
        }}
      </Get>
    </Container>
  );
}

export default Messages;
