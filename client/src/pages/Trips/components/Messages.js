// 
import React, { useState, useEffect } from 'react';
import './style.css';
import useInput from './useInput';
import PubNub from 'pubnub';
import {Card, CardActions, CardContent, List, ListItem, Button, Typography, Input} from '@material-ui/core';


// Main component, parent to all others, rules them
function Messages(props) {
  let defaultChannel = props.tripId;
  console.log(props.tripId)

const [channel, setChannel] = useState(defaultChannel);
const [messages, setMessages] = useState([]);
const [user] = useState(JSON.parse(sessionStorage.getItem("user")));
const tempChannel = useInput();
const tempChannelSearch = useInput();
const tempMessage = useInput();

useEffect(() => {
  console.log("setting up pubnub");
  const pubnub = new PubNub({
    publishKey: "pub-c-d9eb4f4a-5807-" 
    + "4310-bff8-d4bb18295fb0",
    subscribeKey: "sub-c-14656c9a-23bf-" 
    + "11eb-9c54-32dcb901e45f",
    user: user.firstName + ' ' + user.lastName
  });
  
pubnub.addListener({
  status: function(statusEvent) {
    if (statusEvent.category === "PNConnectedCategory") {
      console.log("Connected to PubNub")
    }
  },
  message: function(msg) {
    if(msg.message.text) {
      console.log(msg.message.text)
      let newMessages = [];
      newMessages.push({
        user: msg.message.user,
        text: msg.message.text
      });
      setMessages(messages => messages.concat(newMessages))
    }
  }
});

pubnub.subscribe({
  channels: [channel]
});

pubnub.history(
  {
  channel: channel,
  count: 10,
  stringifiedTimeToken: true
  }, function (status, response) {
  let newMessages = [];
  console.log(response);
  for (let i = 0; i < response.messages.length; i++) {
    newMessages.push ({
      user: response.messages[i].entry.user,
      text: response.messages[i].entry.text
    });
  }
  setMessages(messages => messages.concat(newMessages));
});

return function cleanup() {
  console.log("shutting down pubnub");
  pubnub.unsubscribeAll();
  setMessages([]);
}
}, [channel, user]);

useEffect(() => {
  window.addEventListener("popstate", goBack);

  return function cleanup() {
    window.removeEventListener("popstate", goBack);
  }
}, []);

function handleKeyDown(event) {
  if(event.target.id === 'messageInput'){
    if (event.key === 'Enter') {
      publishMessage();
    }
  } else if(event.target.id === "channelInput") {
    if (event.key === 'Enter') {
      // Navigates to new channels
      const newChannel = tempChannel.value.trim()
      if(newChannel) {
        if(channel !== newChannel) {
          // If the user isn't trying to navigate to the same channel they're on
          setChannel((user.firstName) + ' ' + (user.lastName) + '-' + newChannel);
          let newURL = window.location.origin + "?channel=" + newChannel;
          window.history.pushState(null, '', newURL);
          tempChannel.setValue('');
        }
      }
      else {
        // If the user didn't put anything into the channel input
        if(channel !== "Global") {
          setChannel("Global");
          let newURL = window.location.origin;
          window.history.pushState(null, '', newURL);
          tempChannel.setValue('');
        }
      }
    }
  }
}

// Channel Search
function handleKeyDownTwo(event) {
  if(event.target.id === 'messageInput'){
    if (event.key === 'Enter') {
      publishMessage();
    }
  } else if(event.target.id === "channelSearch") {
    if (event.key === 'Enter') {
      // Navigates to new channels
      const newChannelSearch = tempChannelSearch.value.trim()
      if(newChannelSearch) {
        if(channel !== newChannelSearch) {
          // If the user isn't trying to navigate to the same channel they're on
          setChannel(newChannelSearch);
          let newURL = window.location.origin + "?channel=" + newChannelSearch;
          window.history.pushState(null, '', newURL);
          tempChannelSearch.setValue('');
        }
      }
      else {
        // If the user didn't put anything into the channel input
        if(channel !== "Global") {
          setChannel("Global");
          let newURL = window.location.origin;
          window.history.pushState(null, '', newURL);
          tempChannel.setValue('');
        }
      }
    }
  }
}

function publishMessage() {
  if (tempMessage.value) {
    let messageObject = {
      text: tempMessage.value,
      user: user.firstName + ' ' + user.lastName
    };

    const pubnub = new PubNub({
      publishKey: "pub-c-d9eb4f4a-5807-4310-bff8-d4bb18295fb0",
      subscribeKey: "sub-c-14656c9a-23bf-11eb-9c54-32dcb901e45f",
      user: user.firstName + ' ' + user.lastName
    });
    pubnub.publish({
      message: messageObject,
      channel: channel
    });
    tempMessage.setValue('');
  }
}

function goBack() {
  // Access the params provided in the URL
  let query = window.location.search.substring(1);
  if(!query) {
    setChannel("Global")
  } else {
    let params = query.split("&");
    for(let i = 0; i < params.length; i++) {
      var pair = params[i].split("=");

      // If the user input a channel then the default channel is now set
      // If not, we still navigate to the default channel
      if(pair[0] === "channel" && pair[1] !=="") {
        setChannel(decodeURI(pair[1]))
      }
    }
  }
}

// This returns how the page will look
return(
  <Card style={{width: '95%', height: '100%'}} >
    <CardContent>
      <div className="top">
        <Typography variant="h4" >
        <h4 className="title"><strong>Messages</strong></h4><br></br>
        </Typography>
      </div>
      <div>
        <Log messages = {messages}/>
      </div>
    </CardContent>
    <CardActions>
      <Input
        placeholder = "Enter a message"
        fullWidth = {true}
        id = "messageInput"
        value = {tempMessage.value}
        onChange = {tempMessage.onChange}
        onKeyDown = {handleKeyDown}
        inputProps = {{ 'aria-label': 'Message Field',}}
        autoFocus = {true}
      />
      <Button
        size = "small"
        id = "messageBtn"
        onClick = {publishMessage}
      >
          Submit
        </Button>
    </CardActions>
  </Card>
);
}
  
  // Log functional component that contains the list of messages
  function Log(props) {

  return(
    <List component = "nav">
      <ListItem>
        <Typography component = "div">
          {props.messages.map((item, index) => (
            <Message key = {index} user = {item.user} text = {item.text}/>
          ))}
        </Typography>
      </ListItem>
    </List>
  )
  };
  
  // The message functional component that formats each message
  function Message(props) {
  
    return(
      <div>
        { props.user } : { props.text }
      </div>
    );
  }

  export default Messages;