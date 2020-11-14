import React, { useState, useEffect } from "react";
import api from "../../utils/API";
import Logo from "../../images/better-logo.png";
import { Container } from "react-bootstrap";
import "./style.css";
import { Get } from "react-axios"
function Home() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, [bookmarks]);

  function loadBookmarks() {
    api.bookmark.get().then(res => {
      console.log(res);
      
      setBookmarks(JSON.stringify(res.data));
    }).catch(console.log);
  }

  return (
    <Container fluid="lg" className="p-4">
      
      <div class="container">
      <h1 class="animate__animated animate__fadeIn">Welcome to</h1>
        <img src={Logo} class="animate__animated animate__fadeInUpBig"></img>
      </div>
    </Container>
  );
}

export default Home;
