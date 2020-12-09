import React from "react";
import Alert from "react-bootstrap/Alert";

function Error() {
  return (
    <Alert className="mx-auto col-8 alert alert-danger text-center">
      <h2>Sorry!</h2>
      <hr />
      <h4>This is embarrassing ... and ... our this section isn't working right now.</h4>
    </Alert>
  );
}

export default Error;
