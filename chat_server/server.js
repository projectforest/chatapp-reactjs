// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');// v1 = timebased
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const onlineUsers = {counter: 0};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  if (ws) {
    onlineUsers.counter++;
    console.log(onlineUsers.counter);
  };

  //server side broadcasting function
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
    //if(client.readtState === WebSocket.OPEN){
      client.send(JSON.stringify(data));
      console.log('data sent to client from servers');
    //}
    });
  };
  wss.broadcast(onlineUsers);

  ws.on('message', (data) => {
    const receivedMessage = JSON.parse(data);
    console.log('received message:', receivedMessage);
    switch(receivedMessage.message.type){
      case "postNotification":
        receivedMessage.message.type = "incomingNotification";
        receivedMessage.message['id'] = uuidv1();
        wss.broadcast(receivedMessage);
        break;
      case "postMessage":
        receivedMessage.message.type = "incomingMessage";
        receivedMessage.message['id'] = uuidv1();
        console.log(receivedMessage);
        wss.broadcast(receivedMessage);
        break;
      default:
        throw new Error(`Unknown event type: ${receivedMessage.message.type}`)

    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    onlineUsers.counter--;
    wss.broadcast(onlineUsers);

  });
});