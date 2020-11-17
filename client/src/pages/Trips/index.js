import React from "react";
import { Card, Container } from "react-bootstrap";
import "./style.css";
import { useHistory } from "react-router-dom";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";

function Trips() {
  const history = useHistory();  
  
  console.log(history.location.state);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const path = "/api/tripsbyuser/" + user.id;
  console.log(path);
  return (
    <Container col="6" className="mx-auto">
      <Get url={path}>
        {(error, response, isLoading, makeRequest) => {
          if (error) {
            return (
              <div>
                Something bad happened: {error.message}{" "}
                <button
                  onClick={() => makeRequest({ params: { reload: true } })}
                >
                  Retry
                </button>
              </div>
            );
          } else if (isLoading) {
            return <Loader className ="m-5 p-5" type="Bars" color="#00eFFF44" height={200} width={200} />;
          } else if (response !== null) {
            return response.data.map((item) => <Trip key={item.id} item={item}></Trip>);
          }
          return <div>Default message before request is made.</div>;
        }}
      </Get>
    </Container>
  );
}

function Trip(props) {
  return (
    <Card className="col-7 m-3 p-3 mx-auto">
      <h1>{props.item.name}</h1>
      <h3>{props.item.start}{props.item.end ? " - " + props.item.end : ""}</h3>
    </Card>
  );
}

export default Trips;
