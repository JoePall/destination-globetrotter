import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Get } from "react-axios";
import Loading from "../../../components/Loading";
import DisplayFlight from "../../Search-Flights/DisplayFlight";


function Bookmarks(props) {
  return <Container fluid>
      <h3 className="mx-auto text-center">Bookmarks</h3>
      <Get url={"/api/bookmarksbytrip/" + props.tripId}>
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
                >Reload</button>
              </Alert>
            );
          } else if (response !== null) {
            return <Container fluid>
              {response.data.map(item => {
                return <Container key={item.data.id} fluid>{DisplayFlight({ result: item.data })}</Container>;
              })}
              {(response.data.length === 0) ? <section className="mx-auto text-center"><span>Let's go</span><a className="btn btn-outline-warning m-2 p-2" href="/search-flights">BOOKmark some flights</a><span>!</span></section> : ""}
            </Container>
          }
          return <Loading />;
        }}
      </Get>
    </Container>;
}

export default Bookmarks;