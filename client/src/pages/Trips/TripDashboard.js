import React from "react";
import { Card, Jumbotron } from "react-bootstrap";
import { Get } from "react-axios";
import Loader from "react-loader-spinner";
import "./style.css";

function TripDashboard(id) {
  const path = "/api/usersbytrip/" + id;

  return <Get url={path}>
  {(error, response, isLoading, makeRequest) => {
    if (error) {
      return (
        <div className="danger ">
          Something bad happened: {error.message}{" "}
          <button onClick={() => makeRequest({ params: { reload: true } })}>
            Retry
          </button>
        </div>
      );
    } else if (isLoading) {
      return <Loader className ="m-5 p-5" type="Bars" color="#00eFFF44" height={200} width={200} />;
    } else if (response !== null) {
      console.log(response);
      return <Jumbotron>
        {response.data.map(user => <Card key={user.id} className="col-7 mx-auto p-2 m-2">{user.firstName + " " + user.lastName}</Card>)}
      </Jumbotron>;
    }
    return <div>Default message before request is made.</div>;
  }}
</Get>;
}

export default TripDashboard;
