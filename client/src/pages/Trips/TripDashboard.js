import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./style.css";
import api from "../../utils/API";

function TripDashboard(id) {
  const [users, setUsers] = useState([]);
  
  api.usersbytrip(id).then(res => {
    setUsers(res.data);
  });

  return <div>{users.map(user => <Card key={user.id} className="col-7 mx-auto p-2 m-2">{user.firstName + " " + user.lastName}</Card>)}</div>;
}

export default TripDashboard;
