import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Get } from "react-axios";
import Loading from "../../../components/Loading";
import api from "../../../utils/API";

function Messages(tripId) {
  tripId = tripId.id ? tripId.id : tripId;
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [message, setMessage] = useState("");

  return (
    <Container fluid>
      <Row>
        <h3 className="mx-auto text-center">Messages</h3>
        <Get url={"/api/messagesfromtrip/" + tripId}>
          {(error, response) => {
            if (error) {
              window.location.assign("/trips");
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
                    <div class="card card-body">{JSON.stringify(error)}</div>
                  </div>
                </Alert>
              );
            } else if (response !== null && response.data !== null) {
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
      </Row>
      <Row>
        <InputGroup size="lg">
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setMessage(e.value)}
          />
          <InputGroup.Append>
            <InputGroup.Text onClick={() => {

            }} id="inputGroup-sizing-lg">Send</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </Container>
  );
}

export default Messages;
