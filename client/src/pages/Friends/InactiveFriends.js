import React from 'react';

const InactiveFriends = ({ friends, remove, toggle }) => {
  return (
    <div>
      <ul className="friendList">
        {friends.map(friend => {
          return (
            <li key={friend.name}>
              {friend.name}{' '}
              <button onClick={() => remove(friend)} className="removeFriend">Remove</button>
              <button onClick={() => toggle(friend.name)} className="activateFriend">Activate</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default InactiveFriends;
