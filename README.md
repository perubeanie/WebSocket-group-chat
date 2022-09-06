# Exam Call 4

The structure of this repository is the following:
  - "Client" contains the code of the REACT client implementation;
  - "Server" contains the code of the ToDoManager service application.

## Server

Components I have added/modified:

- components/ws_message.js: the WSmessage has a new property 'messageContent'
- json_schemas/ws_message_schema.json: I've adde two new types of messages: 'chat', 'typing'
- websocket.js: I created a new map 'wsUserIdMap', to map each connection to a userId, so whenever a user logs into the application a new entry in the map will be added.
When a message of type 'chat' or 'typing' is received thanks to the 'wsUserIdMap' the server can check which is the active task of a client through the 'sendSelectedClients'.
- controllers/Users.js: when the user logs out the entry related the user in the 'wsUserIdMap' will be deleted.

## Client

Components I have added/modified:

- src/components/ActiveTaskChat.js: contains all the components needed to implement the chat for the active task: It sends data to the WebSocket either when a user is typing or when they submit a message to the chat.

- src/components/ContentList.js: it displays the 'ActiveTaskChat' component whenever the list of assigned tasks is selected

- src/App.js: 
  * after the user logs in, in the method doLogIn the user sends its id to the WebSocket, so that it will save it in 'wsUserIdMap'
  * the client now expects two new messages from the server: 'chat' if a message was sent in the active task of the user, and 'typing' if some other user is typing some message in the textarea of the active task of our user. 

