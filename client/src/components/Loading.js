import React from "react";
import Container from "react-bootstrap/Container";
import Loader from "react-loader-spinner";

function Loading() {
  return (
    <Container fluid className="mx-auto text-center">
      <Loader
        className="m-5 p-5 mx-auto"
        type="Bars"
        color="#00eFFF44"
        height={100}
        width={100}
      />
    </Container>
  );
}

export default Loading;
