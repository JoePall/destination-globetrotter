import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";
import DisplayFlight from "../../Search-Flights/DisplayFlight";


function Bookmarks(id) {
  id = id.id ? id.id : id;
  
  return <Container fluid>
      <h3 className="mx-auto text-center">Bookmarks</h3>
      <Get url={"/api/bookmarksbytrip/" + id}>
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
            console.log(JSON.stringify(response));
            return <Container fluid>
              {response.data.map(item => {
                return <Container fluid>{DisplayFlight({ result: item.data })}</Container>;
              })}
            </Container>
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

export default Bookmarks;