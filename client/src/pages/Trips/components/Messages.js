import React from "react";
import Container from "react-bootstrap/Container";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";
import Toast from "react-bootstrap/Toast";

function Messages(id) {
  id = id.id ? id.id : id;
  
  return <Container fluid>
      <h3 className="mx-auto text-center">Messages</h3>
      <Get url={"/api/messagesbytrip/" + id}>
        {(error, response, makeRequest) => {
          if (error) {
            return (
              <Alert className="mx-auto col-8 alert alert-danger text-center">
                <h2>Sorry!</h2>
                <hr />
                <h4>This is embarrassing ... and ... our app isn't working right now.</h4>
                <button
                  className="btn btn-danger"
                  onClick={() => makeRequest({ params: { reload: true } })}
                  value="Reload"
                />
              </Alert>
            );
          } else if (response !== null) {
            return response.data.map(item => {
              return <Toast>
              <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">{item.name}</strong>
              </Toast.Header>
              <Toast.Body>{item.message}</Toast.Body>
            </Toast>
            });
          }
          return (
            <Loader
              className="m-5 p-5"
              type="Bars"
              color="#00eFFF44"
              height={200}
              width={200}
            />
          );
        }}
      </Get>
    </Container>;
}

export default Messages;