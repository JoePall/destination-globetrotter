import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "react-bootstrap";
import "./style.css";

function Home() {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    loadBookmarks()
  }, [bookmarks])

  function loadBookmarks() {
    API.Bookmarks.get()
      .then(data => {
        setBookmarks(data);
      })
      .catch(err => console.log(err));
  };

  return (
    <Container fluid="lg" className="p-4">
      <Row>
        <Col sm="6">
          <h1>HOME </h1>
        </Col>
        <Col sm="6">
          <h4><span>HELLO</span><b>WORLD</b></h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;