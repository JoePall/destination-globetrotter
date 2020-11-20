import React from "react";
import Container from "react-bootstrap/Container";
import { Get } from "react-axios";
import Alert from "react-bootstrap/Alert";
import Loading from "../../../components/Loading";

function Messages(id) {
  id = id.id ? id.id : id;
  
  return <Container fluid>
      <h3 className="mx-auto text-center">Messages</h3>
      <Get url={"/api/messagesfromtrip/" + id}>
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
            console.log(response);
            return response.data.map(item => {
              
              return <Alert key={item.id} className="mx-auto warning alert-warning text-center">
              <strong className="mr-auto">{item.name}</strong>
              <hr />
              <p>{item.text}</p>
            </Alert>
            });
          }
          return <Loading />;
        }}
      </Get>
    </Container>;
}

export default Messages;