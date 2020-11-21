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

function Messages(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [message, setMessage] = useState("");

  return (
    <Container fluid className="p-5">
      <Row>
        <Col xs={12}>
          <h3 className="mx-auto text-center">Messages</h3>
        </Col>
        <Get url={"/api/messagesfromtrip/" + props.tripId}>
          {(error, response, makeRequest) => {
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
              console.log(response);
              console.log(response.data);
              if (response.data.data)
                console.log("DATA-----" + response.data.data);
              return response.data.map((item) => {
                return (
                  <Alert
                    key={item.message.id}
                    className="w-100 warning alert-warning text-center"
                  >
                    <strong className="mr-auto">
                      {item.owner.firstName + " " + item.owner.lastName}
                    </strong>
                    <hr />
                    <p>{item.message.text}</p>
                  </Alert>
                );
              });
            }
            return <Loading />;
          }}
        </Get>
      </Row>
      <Row>
        <InputGroup size="lg" className="mb-3">
          <FormControl
            placeholder="Say hello..."
            aria-label="Say hello..."
            aria-describedby="basic-addon2"
            onChange={(e) => setMessage(e.target.value)}
          />
          <InputGroup.Append>
            <Button
              variant="secondary"
              onClick={() => {
                let result = {};

                result.userId = user.id;
                result.tripId = props.tripId;
                result.text = message;

                api.message.create(result).then((res) => {
                  console.log(res);
                });
              }}
              id="inputGroup-sizing-lg"
            >
              Send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </Container>
  );
}

export default Messages;
