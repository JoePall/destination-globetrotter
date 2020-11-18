import React from "react";
import { Container } from "react-bootstrap";
import "./style.css";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";
import TripItem from "./TripItem";

function TripItems() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const path = "/api/tripsbyuser/" + user.id;
  console.log(path);

  return <Container col="6" className="mx-auto">
      <Get url={path}>
        {(error, response, isLoading, makeRequest) => {
          if (error) {
            return (
              <div>
                Something bad happened: {error.message}{" "}
                <button onClick={() => makeRequest({ params: { reload: true } })}>
                  Retry
                </button>
              </div>
            );
          } else if (isLoading) {
            return <Loader className ="m-5 p-5" type="Bars" color="#00eFFF44" height={200} width={200} />;
          } else if (response !== null) {
            return response.data.map((item) => <TripItem key={item.id} item={item}></TripItem>);
          }
          return <div>Default message before request is made.</div>;
        }}
      </Get>
    </Container>
}

export default TripItems;