import React from "react";
import { Container, Card } from "react-bootstrap";
import { Get } from "react-axios";

function Groups() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const path = "/api/groupsbyuser/" + user.id;
  return (
    <Container col="6" className="mx-auto">
      <Get url={path}>
        {(error, response, isLoading, makeRequest, axios) => {
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
            return <div></div>;
          } else if (response !== null) {
            return response.data.map((item) => <Group key={item.id} item={item}></Group>);
          }
          return <div>Default message before request is made.</div>;
        }}
      </Get>
    </Container>
  );
}

function Group(props) {
  return (
    <Card className="col-7 m-3 p-3 mx-auto">
      {props.item.name}
    </Card>
  );
}

export default Groups;
