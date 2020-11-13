import React, { useEffect } from "react";
import api from "../utils/API";

function Logout() {
  useEffect(() => {
    logout();
  }, []);

  function logout() {
    api.User.logout().then(data => {
      console.log("Logged out");
      window.location.assign("/");
    });
  }

  return <span>Logging out...</span>;  
}

export default Logout;