import React from "react";
import { Button, Container } from "react-bootstrap";
import "./style.css";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";
import moment from "moment";

function Trips(props) {
  console.log("props" +props);

  return (
    <Container col="6" className="mx-auto">
      <Get url={path}>
        {(error, response, isLoading, makeRequest) => {
          if (error) {
            return (
              <div className="col-3 card mx-auto">
                Something bad happened: {error.message}{" "}
                <button onClick={() => makeRequest({ params: { reload: true } })}>
                  Retry
                </button>
              </div>
            );
          } else if (isLoading) {
            return <Loader className ="m-5 p-5" type="Bars" color="#00eFFF44" height={200} width={200} />;
          } else if (response !== null) {
            return response.data.map((item) => <Trip key={item.id} item={item}></Trip>);
          }
          return <Loader className ="m-5 p-5" type="Bars" color="#00eFFF44" height={200} width={200} />;
        }}
      </Get>
    </Container>
  );
}

function Trip(props) {
  return (
    <Button onClick={() => {
      console.log(props.item.id);
    }} className="col-7 btn btn-light m-3 p-3 mx-auto">
      <h3>{props.item.location}</h3>
      <h4>{props.item.start ? moment(props.item.start).format("DD/MM/YY") : ""}{props.item.end ? " - " + moment(props.item.end).format("DD/MM/YY") : ""}</h4>
    </Button>
  );
}

export default Trips;
