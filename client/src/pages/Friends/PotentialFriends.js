import React from 'react';

const PotentialFriends = ({ potentialFriends, toggle, remove  }) => {
  return (
   <div>
<ul className="friendList">
  {potentialFriends.map(potentialFriend => {
    return (
      <li key={potentialFriend.name} className="list">
        {potentialFriend.name}
        {console.log(potentialFriend.name)}
        <button onClick={() => toggle(potentialFriend.name)} className="acceptFriend">Accept</button>
        <button onClick={() => remove(potentialFriend)} className="declineFriend">Decline</button>
       
      </li>
    );
  })}
</ul>
</div>
  );
};
export default PotentialFriends;

