import React from "react";
import api from "../utils/API";
import Card from "react-bootstrap/Card"

function Logout() {
  api.user.logout().then(() => window.location.assign("/"));

  sessionStorage.removeItem("user");

  return <Card className="text-center w-25 mx-auto p-5 m-5"><h2>Logging out...</h2></Card>;  
}

export default Logout;