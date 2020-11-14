import React, { useState, useEffect } from "react";
import api from "../../utils/API";
import { Container } from "react-bootstrap";

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
