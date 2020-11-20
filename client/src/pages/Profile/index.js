import React, { useState } from "react";
import Avatar from 'react-avatar';
import "./style.css";

function Profile() {

  const [user] = useState(JSON.parse(sessionStorage.getItem("user")));
  const initials = (user.firstName + user.lastName);

  return (
    <div className="form animate__animated animate__fadeIn">
      <form className="field">
      <div className="card-content">

      <Avatar size="125" round={true} color={Avatar.getRandomColor('sitebase', ['green', 'purple', 'orange', 'red', 'aqua', 'blue', 'yellow'])} name={initials} />
          <h2 id="name" className="">{user.firstName + " " + user.lastName}</h2>
                <p><i className=""></i> {user.email}</p>
                <p><i className=""></i> Group Chat: {user.firstName + " " + user.lastName}</p>
      </div>
  </form>
</div>


  );
}

export default Profile;