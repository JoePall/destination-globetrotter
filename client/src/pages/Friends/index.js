import React, { Component } from 'react';
import './style.css';
import ActiveFriends from './ActiveFriends';
import InactiveFriends from './InactiveFriends';
import PotentialFriends from './PotentialFriends';
import Pending from './components/pending';

class App extends Component {

    constructor(props) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    super(props);
    this.state = {
      potentialFriends: [
        { name: user.firstName + " " + user.lastName + ", " + user.email, potential: true },
        { name: "Mary Smith", potential: true },
        { name: "Jack Frost", potential: true }
      ],
      friends: [
        { name: 'John Doe', active: true },
        { name: 'Jane Doe', active: true },
        { name: 'Pete Smith', active: false }
      ],
      input: ''
    };
  }

 handleInput = e => {
    const { value } = e.target;
    this.setState({
      input: value
    });
  };

  handleRemoveFriend = name => {
    this.setState(prevState => {
      return {
        friends: prevState.friends.filter(friend => friend !== name)
      };
    });
  };

  handleDeclineFriend = name => {
    this.setState(prevState => {
      return {
        potentialFriends: prevState.friends.filter(potentialFriend => potentialFriend !== name)
      };
    });
  };

  handleRemoveAll = () => {
    this.setState({
      friends: []
    });
  };

  handleAddFriend = () => {
    this.setState(prevState => {
      const friends = [
        ...prevState.friends,
        { name: prevState.input, active: true }
      ];
      return {
        friends,
        input: ''
      };
    });
  };

  handleAcceptFriend = nam => {
    this.setState(prevState => {
      const { potentialFriends } = prevState;
      const friend = potentialFriends.find(frnd => frnd.name === nam);
      const newFriends = potentialFriends.filter(f => f !== friend);
      return {
        friends: [
          ...newFriends,
          {
            name: friend.name,
            active: !friend.active
          }
        ]
      }
      
    }) 
  }

  handleToggle = nam => {
    this.setState(prevState => {
      const { friends } = prevState;
      const friend = friends.find(frnd => frnd.name === nam);
      const newFriends = friends.filter(f => f !== friend);
      return {
        friends: [
          ...newFriends,
          {
            name: friend.name,
            active: !friend.active
          }
        ]
      };
    });
  };

  render() {
    return (
      <div>
        <input
          style= {{marginLeft: "40px"}}
          type='text'
          placeholder='Add Friend'
          onChange={this.handleInput}
          value={this.state.input}
        />
        <button onClick={this.handleAddFriend} className="submit">Submit</button>
        <br />

        <h1>Potential Friends</h1>
        <Pending />
        {/* <PotentialFriends
          potentialFriends={this.state.potentialFriends.filter(
            potentialFriends => potentialFriends.potential === true
          )}
          remove={this.handleDeclineFriend}
          toggle={this.handleAcceptFriend}
        /> */}
    
        <h1>Active Friends</h1>
        <ActiveFriends
            friends={this.state.friends.filter(
            friends => friends.active === true
          )}
          remove={this.handleRemoveFriend}
          toggle={this.handleToggle}
        />
        <h1>Inactive Friends</h1>
        <InactiveFriends
          friends={this.state.friends.filter(
            friends => friends.active === false
          )}
          toggle={this.handleToggle}
        />
        <br></br>
        <button onClick={this.handleRemoveAll} className="removeAll">Remove all</button>
      </div>
    );
  }
}


export default App;
