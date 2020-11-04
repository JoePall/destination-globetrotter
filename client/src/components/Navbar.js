import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Header(props) {
  return (
  <header>
    <Row className="rounded-pill my-2 bg-primary p-1">
      <Col className="text-left px-0 mx-0">
        <Button className="rounded-pill btn-light mr-2">Home</Button>
        <Button className="rounded-pill btn-light mr-2">About</Button>
      </Col>
      <Col className="text-right px-0 mx-0">
        <Button className="rounded-pill btn-light ml-2">Account</Button>
      </Col>
    </Row>
  </header>
  );
}

export default Header;