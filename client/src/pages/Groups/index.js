import React, { useState, useEffect } from "react";
import api from "../../utils/API";
import Logo from "../../images/better-logo.png";
import { Container } from "react-bootstrap";
import "./style.css";

function Groups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    loadGroups();
  }, [groups]);

  function loadGroups() {
    api.groupsbyuser.get().then(res => {
      console.log(res);
      
      setGroups(JSON.stringify(res.data));
    }).catch(console.log);
  }

  return (
    <Container fluid="lg" className="p-4">
      {groups}
    </Container>
  );
}

export default Groups;
