import React, { useState } from "react";
import Avatar from "react-avatar";
import "./style.css";

function Editor() {
  const [user] = useState(JSON.parse(sessionStorage.getItem("user")));
  const initials = user.firstName + user.lastName;

  return (
    <div className="form animate__animated animate__fadeIn">
      <form className="field">
        <div className="card-content">
        <div className="row mx-auto my-2">
            <img src={Logo} className="mx-auto" id="icon" alt="User Icon"></img>
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              className="mx-auto"
              onInput={this.handleInputChange}
              name="firstName"
            />
          </div>
          <div className="row mx-auto my-2 fadeIn">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
              className="mx-auto"
              onInput={this.handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Editor;
