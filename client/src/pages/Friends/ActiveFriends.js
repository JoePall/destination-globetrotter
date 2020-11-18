import React from 'react';

const ActiveFriends = ({ friends, remove, toggle }) => {
  return (
    <div>
      <ul className="friendList">
        {friends.map(friend => {
          return (
            <li key={friend.name} className="list">
              {friend.name}
              <button onClick={() => remove(friend)} className="removeFriend">Remove</button>
              <button onClick={() => toggle(friend.name)} className="deactivateFriend">Deactivate</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ActiveFriends;
