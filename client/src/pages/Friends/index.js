import React from 'react';
import Container from 'react-bootstrap/Container';
import Pending from './components/pending';

const Friends = () => {
  return (
    <Container fluid className="mx-auto text-center mb-3">
      <h1>Pending Trip Invitations</h1>
      <Pending />
    </Container>);
};
export default Friends;

