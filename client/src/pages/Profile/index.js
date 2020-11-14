import React from "react";
import Avatar from 'react-avatar';
import "./style.css";

function Profile() {

  return (
    <div className="form">
      <form className="field">
      <div className="card-content">

      <Avatar size="125" round={true} color={Avatar.getRandomColor('sitebase', ['green', 'purple', 'orange', 'red', 'aqua', 'blue', 'yellow'])} name="Joe Example" />
          <h2 id="name" className="">Joe Example</h2>
                <p><i className=""></i> mail@domain.com</p>
                <p><i className=""></i> Group Chat: test</p>
      </div>
  </form>
</div>


  );
}

export default Profile;