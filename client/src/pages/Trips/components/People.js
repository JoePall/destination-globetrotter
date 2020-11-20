import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import { Get } from "react-axios";
import Loading from "../../../components/Loading";
import Select from "react-select";
import api from "../../../utils/API";


function People(id) {
  const [people, setPeople] = useState([]);

  api.user.get((res) => {
    console.log(res);
    console.log(res.data);
    setPeople(res.map((item) => {
      return { label: item.firstName + " " + item.lastName, value: item.id };
    }));
  });

  id = id.id ? id.id : id;

  return (
    <Container fluid>
      <h3 className="mx-auto text-center">People</h3>
      <Get url={"/api/usersbytrip/" + id}>
        {(error, response, makeRequest) => {
          if (error) {
            return (
              <Alert className="mx-auto col-8 alert alert-danger text-center">
                <h2>Sorry!</h2>
                <hr />
                <h4>
                  This is embarrassing ... and ... our app isn't working right
                  now.
                </h4>
                <button
                  className="btn btn-danger"
                  onClick={() => makeRequest({ params: { reload: true } })}
                  value="Reload"
                />
              </Alert>
            );
          } else if (response !== null) {
            return (
              <Container fluid>
                {response.data.map((item) => (
                  <Toast bg="light" key={item.id} className="p-3 my-3 w-100 mx-auto">
                    {item.firstName + " " + item.lastName}
                  </Toast>
                ))}
                <Toast className="p-3 mx-auto">
                {JSON.stringify(people)}
                  <Select
                    placeholder="Invite a friend!"
                    options={people}
                    className="input"
                    onChange={(e) => {
                      console.log(e);
                      location = e;
                    }}
                  />
                </Toast>
              </Container>
            );
          }
          return <Loading />;
        }}
      </Get>
    </Container>
  );
}

export default People;
