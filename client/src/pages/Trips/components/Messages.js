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
import Error from "../../Error";

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
              return <Error />;
            } else if (response !== null && response.data !== null) {
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
